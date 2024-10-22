import { Button } from '@/components/ui/button';
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { HiOutlinePuzzle } from "react-icons/hi";
import EditCourseBasicInfo from './EditCourseBasicInfo';
import { storage } from '@/configs/firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db } from '@/configs/db';
import { eq } from 'drizzle-orm';
import { CourseList } from '@/configs/schema';
import Link from 'next/link';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"

function CourseBasicInfo({course, refreshData, edit=true}) {
  const [selectedFile, setSelectedFile] = useState(); 
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadError, setUploadError] = useState(null);

  // Initialize S3 Client with fetch options
  const s3Client = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
    },
    forcePathStyle: true, // Added this to ensure proper URL construction
    customUserAgent: 'CourseForgeFrontend/1.0.0' // Add custom user agent
  });

  useEffect(() => {
    if(course) {
      setSelectedFile(course?.courseBanner)
    }
  }, [course])

  const uploadToS3 = async (file, fileName) => {
    setUploadError(null);
    setUploadStatus('Starting S3 upload...');

    try {
      // Create file with proper MIME type
      const contentType = file.type || 'application/octet-stream';
      
      const params = {
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
        Key: `courses/${fileName}`,
        Body: file,
        ContentType: contentType,
        CacheControl: 'max-age=31536000', // 1 year cache
        // Add metadata to help with debugging
        Metadata: {
          'original-filename': file.name,
          'upload-date': new Date().toISOString(),
        }
      };

      console.log('Starting upload with params:', {
        Bucket: params.Bucket,
        Key: params.Key,
        ContentType: params.ContentType
      });

      const command = new PutObjectCommand(params);
      const response = await s3Client.send(command);
      
      console.log('S3 upload response:', response);
      
      // Construct the S3 URL with the correct domain format
      const s3Url = `https://${params.Bucket}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${params.Key}`;
      
      console.log('Generated S3 URL:', s3Url);
      setUploadStatus('S3 upload successful!');
      
      // Update the database with the new URL
      await db.update(CourseList)
        .set({ courseBanner: s3Url })
        .where(eq(CourseList.id, course?.id));
      
      return s3Url;
    } catch (error) {
      console.error('Detailed S3 upload error:', {
        message: error.message,
        code: error.code,
        name: error.name,
        stack: error.stack
      });
      setUploadError(`${error.name}: ${error.message}`);
      setUploadStatus('Upload failed');
      throw error;
    }
  };

  const onFileSelected = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setUploadStatus('Processing file...');
      setSelectedFile(URL.createObjectURL(file));
      
      // Clean filename and add timestamp
      const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
      
      // Upload to S3
      setUploadStatus('Uploading to S3...');
      const s3Url = await uploadToS3(file, fileName);
      console.log('S3 upload completed:', s3Url);

      // Upload to Firebase
      setUploadStatus('Uploading to Firebase...');
      const storageRef = ref(storage, 'ai-course/' + fileName);
      await uploadBytes(storageRef, file);
      const firebaseUrl = await getDownloadURL(storageRef);
      console.log('Firebase upload completed:', firebaseUrl);
      
      setUploadStatus('All uploads completed successfully!');
      if (refreshData) refreshData(true);
    } catch (error) {
      console.error('File upload error:', error);
      setUploadStatus('Upload failed');
      setUploadError(error.message);
    }
  }

  return (
    <div className='p-10 border rounded-xl shadow-sm mt-5'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <div>
          <h2 className='font-bold text-3xl'>
            {course?.courseOutput?.Course?.Name}
            {edit && <EditCourseBasicInfo course={course} refreshData={() => refreshData(true)} />}
          </h2>
          <p className='text-sm text-gray-400 mt-3'>{course?.courseOutput?.Course?.Description}</p>
          <h2 className='font-medium mt-2 flex gap-2 items-center text-primary'>
            <HiOutlinePuzzle />{course?.category}
          </h2>
          {uploadStatus && (
            <p className='text-sm mt-2 text-blue-500'>{uploadStatus}</p>
          )}
          {uploadError && (
            <p className='text-sm mt-2 text-red-500'>Error: {uploadError}</p>
          )}
          {!edit && (
            <Link href={'/course/'+course?.courseId+"/start"}>
              <Button className='w-full mt-5'>Start</Button>
            </Link>
          )}
        </div>
        <div>
          <label htmlFor='upload-image'>
            <Image 
              src={selectedFile || '/placeholder.jpg'} 
              width={300} 
              height={300}
              className='w-full rounded-xl h-[250px] object-cover cursor-pointer'
              alt="Course banner"
            />
          </label>
          {edit && <input type="file" id="upload-image" className='opacity-0' onChange={onFileSelected} accept="image/*" />}
        </div> 
      </div>
    </div>
  )
}

export default CourseBasicInfo
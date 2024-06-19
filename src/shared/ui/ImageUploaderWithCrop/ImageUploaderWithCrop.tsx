'use client';

import { FC, useEffect, useRef, useState } from 'react';
import Cropper from 'cropperjs';
import Image from 'next/image';

import { Button } from '@/shared';

import 'cropperjs/dist/cropper.css';

type ImageUploaderWithCropProps = {
  cropWidth: number;
  cropHeight: number;
  imageTitle: string;
  onImageCropped: (file: File) => void;
};

export const ImageUploaderWithCrop: FC<ImageUploaderWithCropProps> = ({
  //TODO - Make it exquisite
  cropWidth,
  cropHeight,
  imageTitle,
  onImageCropped,
}) => {
  const [imageSrc, setImageSrc] = useState('');
  const imageRef = useRef<HTMLImageElement | null>(null);
  const cropperRef = useRef<Cropper | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setImageSrc(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = () => {
    if (cropperRef.current) {
      // const croppedCanvas = cropperRef.current.getCroppedCanvas({
      //   width: cropWidth,
      //   height: cropHeight,
      // });
      cropperRef.current.getCroppedCanvas().toBlob(blob => {
        if (blob) {
          const croppedFile = new File([blob], `${imageTitle}.jpg`, {
            type: 'image/jpeg',
          });
          onImageCropped(croppedFile);
          setImageSrc('');
        }
      }, 'image/jpeg');
    }
  };

  useEffect(() => {
    if (imageSrc && imageRef.current) {
      cropperRef.current = new Cropper(imageRef.current, {
        // aspectRatio: cropWidth / cropHeight,
        viewMode: 1,
        autoCropArea: 1,
        cropBoxResizable: true,
        cropBoxMovable: true,
        dragMode: 'move',
      });
    }
    return () => {
      cropperRef.current?.destroy();
    };
  }, [imageSrc]);

  const handleClose = () => {
    setImageSrc('');
  };

  return (
    <>
      <input
        type="file"
        className="absolute w-1/2 opacity-0"
        onChange={handleImageChange}
        accept="image/*"
      />
      {imageSrc && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-70">
          <div className="relative h-5/6 w-11/12 rounded-lg bg-white p-6 shadow-lg">
            <div className="relative h-full w-full">
              <Image
                ref={imageRef}
                src={imageSrc}
                layout="fill"
                objectFit="contain"
                alt="Source"
                className="rounded-md"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <Button
                type="button"
                onClick={handleCrop}
                className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Crop
              </Button>
              <Button
                type="button"
                onClick={handleClose}
                className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

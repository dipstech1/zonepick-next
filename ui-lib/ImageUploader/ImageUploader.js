import { useState } from "react";
import ImageUploading from "react-images-uploading";

const ImageUploader = ({max,multi}) => {

    const [images, setImages] = useState([]);
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  return (
    <div className="row">
         <ImageUploading
        multiple={multi}
        value={images}
        onChange={onChange}
        maxNumber={max ? max : 5}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps
        }) => (
          // write your building UI
          <div className="r">
            <button
               className="btn btn-success  pull-right"
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            <button className="btn btn-danger  pull-right" onClick={onImageRemoveAll}>Remove all images</button>

            <div className="row my-2">
            {imageList.map((image, index) => (
    

              <div key={index} className="col-md-3">
                <div >
                   <img src={image.data_url} alt="" height="50" width="50" />
                </div>
                <div className="image-item__btn-wrapper">
                  <button className="btn btn-success nextBtn pull-right" onClick={() => onImageUpdate(index)}>Update</button>
                  <button className="btn btn-danger nextBtn pull-right" onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
            </div>
          </div>
        )}
      </ImageUploading>
    </div>
  )
}

export default ImageUploader
// allowed images types to be uploaded
enum AllowedImageTypes {
    JPEG = 'image/jpeg',
    PNG = 'image/png',
    GIF = 'image/gif'
}

// allowed filters for image processing
enum AllowedFilters {
    GRAYSCALE = 'grayscale',
    BLUR = 'blur'
}

export{ 
    AllowedImageTypes, 
    AllowedFilters 
};
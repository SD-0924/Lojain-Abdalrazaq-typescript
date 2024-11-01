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

// watermark positions for image processing
enum WatermarkPositions {
    TOP_LEFT = 'top-left',
    TOP_RIGHT = 'top-right',
    BOTTOM_LEFT = 'bottom-left',
    BOTTOM_RIGHT = 'bottom-right',
    CENTER = 'center'
}

export{ 
    AllowedImageTypes, 
    AllowedFilters,
    WatermarkPositions 
};
# Image-to-Video Project

## Overview

The Image-to-Video project is a web-based application that allows users to generate videos from a sequence of images using AI-powered models. This tool is designed to simplify the process of video creation by leveraging advanced machine learning techniques for seamless image-to-video transformation.

## Features

- **Image Upload**: Upload multiple images to create a video.
- **Model Selection**: Choose from available AI models for video generation.
- **Video Preview**: Preview the generated video directly in the browser.
- **Download Video**: Download the generated video in your preferred format.
- **Customizable Options**: Configure frame rate and output format (e.g., MP4, AVI, MOV).
- **Local AI Models**: Utilize local AI models for efficient video generation.

## Installation

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Python (optional, for advanced AI model setup)
- FFmpeg (required for video encoding)

### Steps

1. Clone the repository:
   ```
   git clone https://github.com/your-username/img-to-video.git
   cd img-to-video
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

## Usage

### Upload Images

1. Navigate to the "Video Generator" page.
2. Click the "Upload Images" button and select the images you want to use.
3. Ensure the images are in the correct order for the video sequence.

### Select Model

1. Choose an AI model from the dropdown menu.
2. Configure additional options like frame rate and output format.

### Generate Video

1. Click the "Generate Video" button.
2. Wait for the process to complete. A preview of the video will be displayed.

### Download Video

1. Click the "Download Video" button to save the generated video to your device.

## Configuration

### Frame Rate

The frame rate determines the smoothness of the video. Common values are:
- 24 FPS (cinematic)
- 30 FPS (standard)
- 60 FPS (high frame rate)

### Output Format

Supported formats:
- MP4 (recommended)
- AVI
- MOV

### Local AI Models

To use local AI models:
1. Place the model file in the `models` directory.
2. Update the `modelPath` configuration in `src/ai/video/local-video-llm.ts`.

## Development

### File Structure

- `src/ai/video`: Contains AI model integration logic.
- `src/components/video`: UI components for video generation.
- `src/pages/video-generator.tsx`: Main page for video generation.
- `src/lib/utils.ts`: Utility functions.

### Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm run lint`: Run linting checks.

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a detailed description.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Support

For issues or questions, please open an issue on GitHub or contact the project maintainer.


// Client-side photo verification service
// Uses basic image analysis and face detection heuristics

export interface VerificationResult {
  isValid: boolean;
  faceDetected: boolean;
  confidenceScore: number;
  feedback: string;
  checks: {
    hasValidDimensions: boolean;
    hasGoodBrightness: boolean;
    hasCenterFocus: boolean;
  };
}

// Analyze image brightness and contrast
function analyzeImageQuality(imageData: ImageData): { brightness: number; contrast: number } {
  const data = imageData.data;
  let totalBrightness = 0;
  let minBrightness = 255;
  let maxBrightness = 0;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const brightness = (r + g + b) / 3;
    totalBrightness += brightness;
    minBrightness = Math.min(minBrightness, brightness);
    maxBrightness = Math.max(maxBrightness, brightness);
  }

  const avgBrightness = totalBrightness / (data.length / 4);
  const contrast = maxBrightness - minBrightness;

  return { brightness: avgBrightness, contrast };
}

// Check if the center of the image has more detail (likely a face)
function analyzeCenterFocus(imageData: ImageData, width: number, height: number): boolean {
  const data = imageData.data;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 4;

  let centerVariance = 0;
  let edgeVariance = 0;
  let centerPixels = 0;
  let edgePixels = 0;

  for (let y = 0; y < height; y += 4) {
    for (let x = 0; x < width; x += 4) {
      const i = (y * width + x) * 4;
      const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
      
      const distFromCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
      
      if (distFromCenter < radius) {
        centerVariance += brightness;
        centerPixels++;
      } else {
        edgeVariance += brightness;
        edgePixels++;
      }
    }
  }

  const avgCenter = centerVariance / (centerPixels || 1);
  const avgEdge = edgeVariance / (edgePixels || 1);

  // Center should have different brightness than edges (face vs background)
  return Math.abs(avgCenter - avgEdge) > 15;
}

// Detect skin tones in the image
function detectSkinTones(imageData: ImageData): number {
  const data = imageData.data;
  let skinPixels = 0;
  const totalPixels = data.length / 4;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Skin tone detection using RGB rules
    const isSkin = (
      r > 95 && g > 40 && b > 20 &&
      Math.max(r, g, b) - Math.min(r, g, b) > 15 &&
      Math.abs(r - g) > 15 &&
      r > g && r > b
    );

    if (isSkin) skinPixels++;
  }

  return skinPixels / totalPixels;
}

export async function verifyPhoto(imageBase64: string): Promise<VerificationResult> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      
      if (!ctx) {
        resolve({
          isValid: false,
          faceDetected: false,
          confidenceScore: 0,
          feedback: "Could not process image",
          checks: { hasValidDimensions: false, hasGoodBrightness: false, hasCenterFocus: false }
        });
        return;
      }

      // Resize for faster processing
      const maxSize = 300;
      const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // Run checks
      const hasValidDimensions = img.width >= 200 && img.height >= 200;
      const { brightness, contrast } = analyzeImageQuality(imageData);
      const hasGoodBrightness = brightness > 40 && brightness < 220 && contrast > 50;
      const hasCenterFocus = analyzeCenterFocus(imageData, canvas.width, canvas.height);
      const skinToneRatio = detectSkinTones(imageData);
      
      // Skin tone should be present (10-60% of image)
      const hasSkinTones = skinToneRatio > 0.08 && skinToneRatio < 0.65;

      // Calculate confidence
      let confidence = 0;
      if (hasValidDimensions) confidence += 20;
      if (hasGoodBrightness) confidence += 25;
      if (hasCenterFocus) confidence += 25;
      if (hasSkinTones) confidence += 30;

      const faceDetected = hasSkinTones && hasCenterFocus;
      const isValid = confidence >= 70;

      // Generate feedback
      let feedback = "";
      if (!hasValidDimensions) {
        feedback = "Image is too small. Please use a larger photo.";
      } else if (!hasGoodBrightness) {
        feedback = brightness < 40 ? "Photo is too dark. Try better lighting." : 
                   brightness > 220 ? "Photo is too bright. Reduce exposure." :
                   "Photo needs more contrast.";
      } else if (!hasSkinTones) {
        feedback = "No face detected. Please upload a clear photo of yourself.";
      } else if (!hasCenterFocus) {
        feedback = "Please center your face in the photo.";
      } else {
        feedback = "Photo verified successfully!";
      }

      resolve({
        isValid,
        faceDetected,
        confidenceScore: confidence,
        feedback,
        checks: { hasValidDimensions, hasGoodBrightness, hasCenterFocus }
      });
    };

    img.onerror = () => {
      resolve({
        isValid: false,
        faceDetected: false,
        confidenceScore: 0,
        feedback: "Could not load image",
        checks: { hasValidDimensions: false, hasGoodBrightness: false, hasCenterFocus: false }
      });
    };

    img.src = imageBase64;
  });
}

// This file patches the three-mesh-bvh package to avoid the BatchedMesh error
const fs = require('fs');
const path = require('path');

const filePath = path.join(
  __dirname, 
  '../../node_modules/three-mesh-bvh/src/utils/ExtensionUtilities.js'
);

try {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove the BatchedMesh import
  content = content.replace(
    "import { MeshBVH, Mesh, Box3, Vector3, Matrix4, Ray, Sphere, Vector2, BatchedMesh } from 'three';",
    "import { MeshBVH, Mesh, Box3, Vector3, Matrix4, Ray, Sphere, Vector2 } from 'three';"
  );
  
  // Patch any BatchedMesh references
  content = content.replace(/BatchedMesh/g, 'Mesh');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully patched three-mesh-bvh');
} catch (error) {
  console.error('Failed to patch three-mesh-bvh:', error);
}

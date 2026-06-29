import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { verifyRequest } from '@/lib/auth';

const FILES_MAP = {
  projects: path.join(process.cwd(), 'public', 'projects.json'),
  testimonials: path.join(process.cwd(), 'app', 'data', 'testimonials.json'),
  youtube: path.join(process.cwd(), 'app', 'data', 'youtube.json'),
  solutions: path.join(process.cwd(), 'app', 'data', 'solutions.json'),
  skills: path.join(process.cwd(), 'app', 'data', 'tools.json'),
  faqs: path.join(process.cwd(), 'app', 'data', 'faqs.json'),
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (!type || !FILES_MAP[type]) {
      return NextResponse.json(
        { error: 'Invalid type parameter specified' },
        { status: 400 }
      );
    }

    const filePath = FILES_MAP[type];
    
    try {
      const dataStr = await fs.readFile(filePath, 'utf-8');
      const data = JSON.parse(dataStr);
      return NextResponse.json(data);
    } catch (err) {
      if (err.code === 'ENOENT') {
        // If file does not exist, return default empty structure
        const defaultData = type === 'skills' ? { backend: [], frontend: [], database: [], 'other-tools': [] } : [];
        return NextResponse.json(defaultData);
      }
      throw err;
    }
  } catch (error) {
    console.error('Data GET error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve data', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    // 1. Verify admin authentication
    const isAuthenticated = verifyRequest(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized: Admin session required' },
        { status: 401 }
      );
    }

    // 2. Parse arguments
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (!type || !FILES_MAP[type]) {
      return NextResponse.json(
        { error: 'Invalid type parameter specified' },
        { status: 400 }
      );
    }

    const bodyData = await request.json();
    const filePath = FILES_MAP[type];

    // 3. Write data to JSON file
    const dataStr = JSON.stringify(bodyData, null, 2);
    
    // Ensure directories exist
    const dirPath = path.dirname(filePath);
    await fs.mkdir(dirPath, { recursive: true });
    
    await fs.writeFile(filePath, dataStr, 'utf-8');

    return NextResponse.json({ success: true, message: `${type} updated successfully` });
  } catch (error) {
    console.error('Data POST error:', error);
    return NextResponse.json(
      { error: 'Failed to save data', details: error.message },
      { status: 500 }
    );
  }
}

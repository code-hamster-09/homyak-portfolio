import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const SECRET_KEY = process.env.SECRET_KEY || 'YOUR_SECRET_KEY';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  // В реальном приложении вы бы хешировали пароль при регистрации
  // и сравнивали хеши здесь.
  // Для простоты, пока просто сравниваем с захардкоженным паролем.
  // В идеале, ADMIN_PASSWORD должен быть хеширован в .env

  if (username === 'admin' && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ id: 'admin' }, SECRET_KEY, { expiresIn: '24h' });
    return NextResponse.json({ token }, { status: 200 });
  } else {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }
}


import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { code } = req.query;
    if (code) {
      const setProduct = await prisma.product.findUnique({
        where: { code },
      });
      return res.json(products);
    }
    const product = await prisma.product.findMany();
    return res.json(products);
  }

  if (req.method === 'POST') {
    const { code, name, description, price } = req.body;
    const product = await prisma.product.create({
      data: { code, name, description, price },
    });
    return res.status(201).json(products);
  }

  if (req.method === 'PUT') {
    const { id, code, name, description, price } = req.body;
    const product = await prisma.product.update({
      where: { id },
      data: { code, name, description, price },
    });
    return res.json(products);
  }

  res.setHeader('Allow', ['GET', 'POST', 'PUT']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
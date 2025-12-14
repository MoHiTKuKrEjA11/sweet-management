import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { auth } from "../middleware/auth.js";

const prisma = new PrismaClient();
const router = Router();

router.get("/", auth(), async (req, res) => {
  const { category, minPrice, maxPrice, name } = req.query;

  const where = {
    ...(category && { category }),
    ...(name && {
      name: { contains: name, mode: "insensitive" },
    }),
    ...((minPrice || maxPrice) && {
      price: {
        ...(minPrice && { gte: parseFloat(minPrice) }),
        ...(maxPrice && { lte: parseFloat(maxPrice) }),
      },
    }),
  };

  const sweets = await prisma.sweet.findMany({
    where,
  });

  res.json(sweets);
});

router.post("/", auth(["ADMIN"]), async (req, res) => {
  const sweet = await prisma.sweet.create({ data: req.body });
  res.status(201).json(sweet);
});

router.put("/:id", auth(), async (req, res) => {
  const updated = await prisma.sweet.update({
    where: { id: Number(req.params.id) },
    data: req.body,
  });
  res.json(updated);
});

router.delete("/:id", auth(["ADMIN"]), async (req, res) => {
  await prisma.sweet.delete({ where: { id: Number(req.params.id) } });
  res.sendStatus(200);
});

router.post("/:id/purchase", auth(), async (req, res) => {
  const { amount } = req.body;
  const id = Number(req.params.id);

  const sweet = await prisma.sweet.findUnique({ where: { id } });
  if (!sweet) return res.status(404).json({ message: "Sweet not found" });

  if (sweet.quantity < amount) {
    return res.status(400).json({ message: "Not enough stock" });
  }

  const updated = await prisma.sweet.update({
    where: { id },
    data: { quantity: { decrement: amount } },
  });

  res.json(updated);
});

router.post("/:id/restock", auth(["ADMIN"]), async (req, res) => {
  const { amount } = req.body;
  console.log(amount);
  const id = Number(req.params.id);

  const updated = await prisma.sweet.update({
    where: { id },
    data: { quantity: { increment: amount } },
  });

  res.json(updated);
});

export default router;

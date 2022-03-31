import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database';
import { Entry, IEntry } from '../../../../models';

type Data =
  | { message: string }
  | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'PUT':
      return updateEntry(req, res);
    case 'GET':
      return getEntry(req, res);
    default:
      return res.status(400).json({ message: 'Endpoint does not exist. ' });
  }
}

// GET entries 
const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  try {
    await db.connect();
    const entryInDB = await Entry.findById(id);
    if (!entryInDB) {
      await db.disconnect();
      return res.status(400).json({ message: 'the requested information does not exist. ' });
    }
    await db.disconnect();
    return res.status(200).json(entryInDB);
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error. ' });
  }
}

// PUT entries 
const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  try {
    await db.connect();
    const entryToUpdate = await Entry.findById(id);
    if (!entryToUpdate) {
      await db.disconnect();
      return res.status(400).json({ message: 'the requested information does not exist. ' });
    }
    const {
      description = entryToUpdate.description,
      status = entryToUpdate.status,
    } = req.body;
    const updateEntry = await Entry.findByIdAndUpdate(id, { description, status }, { runValidators: true, new: true });
    await db.disconnect();
    return res.status(200).json(updateEntry!);
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error. ' });
  }
}
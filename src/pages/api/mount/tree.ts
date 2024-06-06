import { Input } from '@/types/Input';
import { Output } from '@/types/Output';
import { Message } from '@/types/Message';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * @swagger
 * /api/modify/tree:
 *   get:
 *     description: Return modified data
 *     responses:
 *       200:
 *         description: modify data
 *       500:
 *         description: internal error
 *       405:
 *         description: method not allowed
 */
export default async function handler(request: NextApiRequest, response: NextApiResponse<Output[] | Message>){
  if(request.method !== 'POST') response.status(405).json({ message: "Method not allowed" });
  
  const body = request.body.text as string;
  const parsedBody = JSON.parse(body) as Input[]

  if(!Array.isArray(parsedBody) || parsedBody.length === 0) response.status(400).json({ message: "Bad Request" });

  // const client = await pool.connect();

  try {
    const sortedData = parsedBody?.sort((a, b) => Number(a.entryId) - Number(b.entryId))
      .sort((a, b) => a.path.length - b.path.length);

    const output: Output[] = [];

    sortedData.forEach((input) => {
      let dir = output;

      input.path.forEach((path: any, index: number) => {
        const lastPath = index === input.path.length - 1;
        if (lastPath) {
          dir.push({
            entryId: Number(input.entryId),
            fullPath: input.path.join('/'),
            currentPath: path,
            children: [],
          });
        } else {
          const itemCurrentPath = dir.find(
            (item) => item.currentPath === path
          );
          if (!itemCurrentPath) {
            const errorPath = input.path.filter((_: any, i: number) => i <= index).join('/')
            throw new Error(
              `${errorPath} not found`,
            );
          }
          dir = itemCurrentPath.children;
        }
      });
    });
    response.status(200).json(output);
  } catch (e) {
      throw e;
  } finally {
      // client.release();
  }
}
import { Input } from '@/types/Input';
import { Output } from '@/types/Output';
import { Message } from '@/types/Message';

// export const convert = (inputs: Input[]): Output[] => {
//   const sortedInputs = inputs
//     .sort((a, b) => Number(a.entryId) - Number(b.entryId))
//     .sort((a, b) => a.path.length - b.path.length);

//   const output: Output[] = [];

//   sortedInputs.forEach((input) => {
//     let currentDirectory = output;

//     input.path.forEach((path: any, index: number) => {
//       const lastPath = index === input.path.length - 1;

//       if (lastPath) {
//         currentDirectory.push({
//           entryId: Number(input.entryId),
//           fullPath: input.path.join('/'),
//           currentPath: path,
//           children: [],
//         });
//       } else {
//         const itemCurrentPath = currentDirectory.find(
//           (item) => item.currentPath === path
//         );
//         if (!itemCurrentPath) {
//           throw new Error(
//             `Path ${input.path
//               .filter((_: any, i: number) => i <= index)
//               .join('/')} not found`,
//           );
//         }
//         currentDirectory = itemCurrentPath.children;
//       }
//     });
//   });

//   return output;
// };


import { NextApiRequest, NextApiResponse } from 'next';

/**
 * @swagger
 * /api/hello:
 *   get:
 *     description: Returns the hello world
 *     responses:
 *       200:
 *         description: hello world
 */
export default async function handler(request: NextApiRequest, response: NextApiResponse<Output[] | Message>){
  if(request.method !== 'POST') response.status(405).json({ message: "Method not allowed" });
  const body = request.body as Input[];


  // const client = await pool.connect();

  try {
    const sortedData = body
      .sort((a, b) => Number(a.entryId) - Number(b.entryId))
      .sort((a, b) => a.path.length - b.path.length);

    const output: Output[] = [];

    sortedData.forEach((input) => {
      let currentDirectory = output;

      input.path.forEach((path: any, index: number) => {
        const lastPath = index === input.path.length - 1;

        if (lastPath) {
          currentDirectory.push({
            entryId: Number(input.entryId),
            fullPath: input.path.join('/'),
            currentPath: path,
            children: [],
          });
        } else {
          const itemCurrentPath = currentDirectory.find(
            (item) => item.currentPath === path
          );
          if (!itemCurrentPath) {
            throw new Error(
              `Path ${input.path
                .filter((_: any, i: number) => i <= index)
                .join('/')} not found`,
            );
          }
          currentDirectory = itemCurrentPath.children;
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


 //   const { rows } = await client.query(
    //     `INSERT INTO partners.ligga_telecom
    //       (
    //         contact_name, 
    //         contact_email, 
    //         contact_phone, 
    //         privacy_policy,
    //         bill_total_value, 
    //         power_distribution_unit_legal_name,
    //         inserted_at,
    //         updated_at
    //       ) 
    //     VALUES 
    //       ($1, $2, $3, $4, $5, $6, $7, $8) 
    //     RETURNING
    //       id`,
    //     [
    //       contactName,
    //       contactEmail,
    //       contactPhone,
    //       privacyPolicy,
    //       billTotalValue,
    //       powerDistributionUnitLegalName,
    //       new Date(),
    //       new Date(),
    //     ]
    //   );
/**
 * @jest-environment node
 */
import { createMocks, createRequest, createResponse, RequestMethod } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';
import treeHandler from '../tree';
import { inputList } from '@/input';
import { outputList } from '@/output';

export type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>;
export type ApiResponse = NextApiResponse & ReturnType<typeof createResponse>;

describe('/api/mount/tree API Endpoint', () => {
  const authToken = process.env.AUTH_TOKEN;
  const gatewayID = process.env.DEVICE_ID;

  function mockRequestResponse(method: RequestMethod = "POST") {
    const {
      req,
      res,
    }: { req: ApiRequest; res: ApiResponse } = createMocks({ method });
    req.headers = {
      'Content-Type': 'application/json',
      'X-SESSION-TOKEN': authToken,
    };
    return { req, res };
  }

  it('should return a successful response', async () => {
    const { req, res } = mockRequestResponse();
    req.body = inputList;

    await treeHandler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.getHeaders()).toEqual({ 'content-type': 'application/json' });
    expect(res.statusMessage).toEqual('OK');
  });
});
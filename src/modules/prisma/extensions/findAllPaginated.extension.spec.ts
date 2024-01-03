import { Prisma } from '@api-core/generated/prisma-client';
import { findAllPaginated } from './findAllPaginated.extension';

describe('findAllPaginated Extension', () => {
  let mockModel: {
    findMany: jest.MockedFunction<Prisma.Args<any, 'findMany'>>;
    count: jest.MockedFunction<any>;
    findAllPaginated: typeof findAllPaginated;
  };

  beforeEach(() => {
    mockModel = {
      findMany: jest
        .fn()
        .mockResolvedValue([{ name: 'A Club' }, { name: 'A Second Club' }]),
      count: jest.fn().mockResolvedValue(4),
      findAllPaginated,
    };
  });

  it('Should return a correct pagination response', async () => {
    const response = await mockModel.findAllPaginated({ limit: 2, offset: 0 });
    expect(mockModel.findMany).toHaveBeenCalledWith({
      skip: 0,
      take: 2,
    });
    expect(mockModel.count).toHaveBeenCalled();
    expect(response).toEqual({
      entities: [
        {
          name: 'A Club',
        },
        {
          name: 'A Second Club',
        },
      ],
      page: 0,
      totalEntities: 4,
      totalPages: 2,
    });
  });

  it('Should correctly compute pages based on the offset', async () => {
    mockModel.findMany.mockResolvedValue([{ name: 'A Club' }]);
    const response = await mockModel.findAllPaginated({ limit: 1, offset: 2 });
    expect(response).toEqual({
      entities: [
        {
          name: 'A Club',
        },
      ],
      page: 1,
      totalEntities: 4,
      totalPages: 4,
    });
  });

  it('Should return a happy response even if no data is found', async () => {
    mockModel.findMany.mockResolvedValue([]);
    mockModel.count.mockResolvedValue(0);
    const response = await mockModel.findAllPaginated({ limit: 2, offset: 0 });
    expect(response).toEqual({
      entities: [],
      page: 0,
      totalEntities: 0,
      totalPages: 0,
    });
  });

  it('Should provide sane defaults in the case of no parameters being passed', async () => {
    mockModel.findMany.mockResolvedValue([]);
    mockModel.count.mockResolvedValue(0);
    await mockModel.findAllPaginated({
      limit: undefined,
      offset: undefined,
    });
    expect(mockModel.findMany).toHaveBeenCalledWith({
      skip: 0,
      take: 10,
    });
  });
});

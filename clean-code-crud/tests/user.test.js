// user.test.js
describe('CreateUserUseCase', () => {
    it('should validate email format', async () => {
      const mockRepo = { create: jest.fn() };
      const useCase = new CreateUserUseCase(mockRepo);
      
      await expect(useCase.execute({ email: 'invalid' }))
        .rejects.toThrow('Invalid email format');
    });
  });
  
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPageCard from '../../pages/LoginPage/LoginPageCard';
import axios from '../../config/axios';
import { toast } from 'react-toastify';

jest.mock('../../config/axios.js', () => ({
    post: jest.fn(),
}));

jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

describe('LoginPageCard', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should login successfully as a customer with valid credentials', async () => {
        const customerResponse = {
            data: {
                token: 'customer-token',
                role: 'CUSTOMER',
                // Add other relevant data
            },
        };

        axios.post.mockResolvedValueOnce(customerResponse);

        render(
            <MemoryRouter>
                <LoginPageCard />
            </MemoryRouter>
        );

        const emailInput = screen.getByLabelText(/Email/i);
        const passwordInput = screen.getByLabelText(/Mật Khẩu/i);
        const submitButton = screen.getByRole('button', { name: /Đăng Nhập/i });

        fireEvent.change(emailInput, { target: { value: 'customer@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('login', {
                email: 'customer@example.com',
                password: 'password123',
            });
            expect(toast.success).toHaveBeenCalledWith('Đăng Nhập Thành Công');
            // Add additional assertions based on the expected behavior
        });
    });
});
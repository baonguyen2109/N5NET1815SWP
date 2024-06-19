import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPageCard from '../../pages/LoginPage/LoginPageCard';

describe('LoginPageCard', () => {
    it('should display error message when all mandatory fields are not filled', async () => {
        render(
            <MemoryRouter>
                <LoginPageCard />
            </MemoryRouter>
        );

        const submitButton = screen.getByRole('button', { name: /Đăng Nhập/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            const emailError = screen.getByText(/Hãy Nhập Email của bạn/i);
            const passwordError = screen.getByText(/Hãy nhập Mật Khẩu của bạn!/i);
            expect(emailError).toBeInTheDocument();
            expect(passwordError).toBeInTheDocument();
        });
    });
});
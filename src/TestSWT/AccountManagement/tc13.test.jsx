import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ChangePasswordPage from './ChangePasswordPage';

describe('Verify successful password change', () => {  test('renders ChangePasswordPage component', () => {
    render(<ChangePasswordPage />);

    // Assert that the component is rendered correctly
    expect(screen.getByText('Thay Đổi mật khẩu')).toBeInTheDocument();
  });

  test('form submission', async () => {
    render(<ChangePasswordPage />);

    // Mock the API response
    jest.spyOn(api, 'post').mockResolvedValue({});

    // Fill in the password input
    fireEvent.change(screen.getByLabelText('Mật Khẩu Mới'), {
      target: { value: 'newPassword' },
    });

    // Submit the form
    fireEvent.click(screen.getByText('Xác Nhận'));

    // Assert that the API was called
    expect(api.post).toHaveBeenCalledWith('reset-password', { password: 'newPassword' });

    // Assert that success toast is displayed
    await screen.findByText('Thay đổi mật khẩu thành công');
  });
});


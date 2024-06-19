import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ChangePasswordPage from './ChangePasswordPage';

describe('Verify password change fails with new passwords do not match', () => {
  test('renders ChangePasswordPage component', () => {
    render(<ChangePasswordPage />);

    // Assert that the component is rendered correctly
    expect(screen.getByText('Thay Đổi mật khẩu')).toBeInTheDocument();
  });

  test('form submission', async () => {
    render(<ChangePasswordPage />);

    // Mock the API response to simulate passwords not matching
    jest.spyOn(api, 'post').mockRejectedValue({ response: { data: 'Passwords do not match' } });

    // Fill in the password input
    fireEvent.change(screen.getByLabelText('Mật Khẩu Mới'), {
      target: { value: 'newPassword' },
    });

    // Submit the form
    fireEvent.click(screen.getByText('Xác Nhận'));

    // Assert that the API was called
    expect(api.post).toHaveBeenCalledWith('reset-password', { password: 'newPassword' });

    // Assert that error toast is displayed
    await screen.findByText('Đã có lỗi khi thay đổi mật khẩu');
  });
});
/*change
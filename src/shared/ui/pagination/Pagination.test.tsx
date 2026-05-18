import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Pagination } from './Pagination';

describe('Pagination Component', () => {
  const defaultProps = {
    currentPage: 2,
    totalPages: 5,
    onPageChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return null and render nothing if totalPages is 1 or less', () => {
    const { container } = render(<Pagination {...defaultProps} totalPages={1} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render correct current page and total pages text', () => {
    render(<Pagination {...defaultProps} currentPage={3} totalPages={10} />);
    expect(screen.getByText('Page 3 of 10')).toBeInTheDocument();
  });

  it('should not call onPageChange when Back button is clicked on the first page', async () => {
    render(<Pagination {...defaultProps} currentPage={1} />);

    await userEvent.click(screen.getByText('Back'));
    expect(defaultProps.onPageChange).not.toHaveBeenCalled();
  });

  it('should not call onPageChange when Next button is clicked on the last page', async () => {
    render(<Pagination {...defaultProps} currentPage={5} totalPages={5} />);

    await userEvent.click(screen.getByText('Next'));
    expect(defaultProps.onPageChange).not.toHaveBeenCalled();
  });

  it('should call onPageChange with correct argument when Back button is clicked on a valid page', async () => {
    render(<Pagination {...defaultProps} currentPage={3} />);

    await userEvent.click(screen.getByText('Back'));
    expect(defaultProps.onPageChange).toHaveBeenCalledTimes(1);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
  });

  it('should call onPageChange with correct argument when Next button is clicked on a valid page', async () => {
    render(<Pagination {...defaultProps} currentPage={3} />);

    await userEvent.click(screen.getByText('Next'));
    expect(defaultProps.onPageChange).toHaveBeenCalledTimes(1);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(4);
  });
});

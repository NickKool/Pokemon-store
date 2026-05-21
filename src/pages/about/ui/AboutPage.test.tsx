import { render, screen } from '@testing-library/react';
import { AboutPage } from './AboutPage';

describe('AboutPage Component', () => {
  it('should render the component correctly with header and text', () => {
    render(<AboutPage />);

    const heading = screen.getByRole('heading', { name: /about us/i });
    expect(heading).toBeInTheDocument();

    const authorName = screen.getByText(/Nikolay/i);
    expect(authorName).toBeInTheDocument();

    expect(screen.getByText(/aspiring Frontend Developer/i)).toBeInTheDocument();
  });

  it('should contain external links with correct attributes and security profiles', () => {
    render(<AboutPage />);

    const githubLink = screen.getByRole('link', { name: /my github profile/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/NickKool');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noreferrer');

    const courseLink = screen.getByRole('link', { name: /rs school react course/i });
    expect(courseLink).toBeInTheDocument();
    expect(courseLink).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
    expect(courseLink).toHaveAttribute('target', '_blank');
    expect(courseLink).toHaveAttribute('rel', 'noreferrer');
  });
});

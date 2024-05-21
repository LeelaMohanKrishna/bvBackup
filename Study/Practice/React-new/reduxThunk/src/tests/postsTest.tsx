import React from 'react';
import { render, screen } from '@testing-library/react';
import Posts from '../pages/posts';

test('renders posts', () => {
	render(<Posts />);
});

import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import withRoute from './helpers/withRoute';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

const originalStorage = window.localStorage;
const mockStorage = () => {
  let store = {};
  return {
    setItem: jest.fn((key, value) => (store[key] = value)),
    getItem: jest.fn(key => store[key]),
    removeItem: jest.fn(key => delete store[key]),
    clear: () => (store = {}),
  };
};

window.localStorage = mockStorage;

jest.mock('../services/api.ts', () => {
  return {
    ...jest.requireActual('../services/api.ts'),
    createSession: token => Promise.resolve('I am a valid session ID'),
  };
});

describe('App', () => {
  let history;
  let component;
  beforeEach(() => {
    window.localStorage.clear();
    history = createMemoryHistory();
    component = render(withRoute(<App />, { history }));
  });

  afterAll(() => (window.localStorage = originalStorage));

  it('should render the App component', () => {
    expect(screen.getByTestId('app')).toBeInTheDocument();
  });

  it('should display the search bar', () => {
    expect(screen.getByRole('textbox').attributes.placeholder).toHaveTextContent(/search/i);
  });

  it('should render the login button', () => {
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('should render a list of favourite movies', () => {
    expect(screen.getByRole('heading', { name: /favourites/i })).toBeInTheDocument();
  });

  it('should render a list of discovery movies', () => {
    expect(screen.getByRole('heading', { name: /discover/i })).toBeInTheDocument();
  });

  it('should render a "show more" button', () => {
    expect(screen.getByRole('button', { name: /show more/i })).toBeInTheDocument();
  });

  it('should render a logout button', async () => {
    history.push('/?request_token=jssjdlkfasdlksdf&approved=true');
    component.unmount();
    component = render(withRoute(<App />, { history, path: '/' }));
    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /login/i })).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
    });
  });
  describe('searchBar functionality', () => {
    it('should search for a movie when typing on the search-bar', async () => {
      const oldConsole = global.console.error;
      global.console.error = jest.fn();
      const mockMovieTitle = 'inception';
      const searchBar = screen.getByPlaceholderText(/search/);
      userEvent.type(searchBar, mockMovieTitle);
      expect(searchBar).toHaveValue(mockMovieTitle);
      expect(screen.queryByText(mockMovieTitle)).not.toBeInTheDocument();
      await waitFor(() => {
        expect(screen.getAllByText(new RegExp(mockMovieTitle, 'i')).length).not.toBe(0);
      });
      userEvent.type(searchBar, Array(mockMovieTitle.length).fill('{backspace}').join(''));
      await waitFor(() => {
        expect(screen.queryByTestId(/searchResults/i)).not.toBeInTheDocument();
      });
      global.console.error = oldConsole;
    });

    it('should remove the search when the background is clicked', async () => {
      const oldConsole = global.console.error;
      global.console.error = jest.fn();
      const mockMovieTitle = 'inception';
      const searchBar = screen.getByPlaceholderText(/search/);
      userEvent.type(searchBar, mockMovieTitle);
      const queryBg = screen.queryByTestId(/searchResults/i);
      await waitFor(() => {
        expect(queryBg).toBeInTheDocument();
      });
      userEvent.click(queryBg);
      expect(queryBg).not.toBeInTheDocument();
      global.console.error = oldConsole;
    });
  });
});

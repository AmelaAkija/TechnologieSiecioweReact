import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { LoginDto, LoginResponseDto } from './dto/login-dto';
import Book from '../book/Book';
import User from '../users/User';
import Loan from '../loan/Loan';
import book from '../book/Book';

export type ClientResponse<T> = {
  success: boolean;
  data: T;
  statusCode: number;
};
export class LibraryClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:8080',
    });
    const token = localStorage.getItem('token');
    if (token) {
      this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      //axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }
  public async login(data: {
    login: string;
    password: string;
  }): Promise<ClientResponse<LoginResponseDto | null>> {
    try {
      const response: AxiosResponse<LoginResponseDto> = await this.client.post(
        '/Login',
        data,
      );
      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token);
        this.client.defaults.headers.common['Authorization'] =
          `Bearer ${token}`;
        //axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }
  public async getBooks(): Promise<ClientResponse<any | null>> {
    try {
      const response = await this.client.get('/Book/GetAll');
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getUsers(): Promise<ClientResponse<any | null>> {
    try {
      const response = await this.client.get('/users/GetAll');
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getLoans(): Promise<ClientResponse<any | null>> {
    try {
      const response = await this.client.get('/Loan/GetAll');

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getBooksByTitle(
    title: string,
  ): Promise<ClientResponse<any[] | null>> {
    try {
      const response = await this.client.get(`/Book/SearchBy/title/${title}`);

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getBooksByAuthor(
    author: string,
  ): Promise<ClientResponse<any[] | null>> {
    try {
      const response = await this.client.get(`/Book/SearchBy/author/${author}`);

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async addBook(book: Book): Promise<ClientResponse<any | null>> {
    try {
      const response = await this.client.post('/Book/Add', book);

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async addUser(user: User): Promise<ClientResponse<any | null>> {
    try {
      const response = await this.client.post('/users/Add', user);

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async addLoan(loan: Loan): Promise<ClientResponse<any | null>> {
    try {
      const response = await this.client.post('/Loan/Add', loan);

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async deleteUser(userId: number): Promise<ClientResponse<any | null>> {
    try {
      const response = await this.client.delete(`/users/deleteUser/${userId}`);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async deleteLoan(loanId: number): Promise<ClientResponse<any | null>> {
    try {
      const response = await this.client.delete(`/Loan/deleteLoan/${loanId}`);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async deleteBook(bookId: number): Promise<ClientResponse<any | null>> {
    try {
      const response = await this.client.delete(`/Book/deleteBook/${bookId}`);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getRole(): Promise<ClientResponse<string | null>> {
    try {
      const response: AxiosResponse<string> =
        await this.client.get('/user-role');
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  // public async getID(): Promise<ClientResponse<string | null>> {
  //   try {
  //     const response: AxiosResponse<string> = await this.client.get('/user-id');
  //     return {
  //       success: true,
  //       data: response.data,
  //       statusCode: response.status,
  //     };
  //   } catch (error) {
  //     const axiosError = error as AxiosError<Error>;
  //     return {
  //       success: false,
  //       data: null,
  //       statusCode: axiosError.response?.status || 0,
  //     };
  //   }
  // }

  public async getBorrowedBooks(
    userId: number,
  ): Promise<ClientResponse<any[] | null>> {
    try {
      const response: AxiosResponse<any[]> = await this.client.get(
        `/Loan/GetLoansByUser/${userId}`,
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getBookById(
    bookId: number,
  ): Promise<ClientResponse<Book | null>> {
    try {
      const response = await this.client.get(`/Book/SearchBy/ID/${bookId}`);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getUserById(
    userId: number,
  ): Promise<ClientResponse<User | null>> {
    try {
      const response = await this.client.get(`/users/SearchBy/ID/${userId}`);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async updateBook(
    bookId: number,
    book: Book,
  ): Promise<ClientResponse<string | null>> {
    try {
      const response = await this.client.put(
        `/Book/updateBook/${bookId}`,
        book,
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async updateUser(
    userId: number,
    user: User,
  ): Promise<ClientResponse<string | null>> {
    try {
      const response = await this.client.put(`/users/update/${userId}`, user);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }
}

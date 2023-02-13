'use client';

export const PATH_TOKEN = 'bingo-js-token';

export const sessionSevices = () => ({
  create: async (data: string) => {
    const token = data;
    localStorage.setItem(PATH_TOKEN, token);
    localStorage.setItem(`${token}:balls`, JSON.stringify([]));
    localStorage.setItem(`${token}:current`, '');
  },
  list: () => {
    const token: string = localStorage.getItem(PATH_TOKEN)!;
    const balls: string = localStorage.getItem(`${token}:balls`) || '[]';
    const item: number[] = JSON.parse(balls);
    return item;
  },
  listCurrent: () => {
    const token: string = localStorage.getItem(PATH_TOKEN)!;
    const stringBall: string = localStorage.getItem(`${token}:current`) || '';
    const ball: number = Number(stringBall);
    return ball;
  },
  update: (data: number[]) => {
    const token = localStorage.getItem(PATH_TOKEN);
    const currentArrayOfBalls = data;
    localStorage.setItem(`${token}:balls`, JSON.stringify(currentArrayOfBalls));
  },
  updateCurrent: (data: number | string) => {
    const token: string = localStorage.getItem(PATH_TOKEN)!;
    const currentBall: number | string = data;
    localStorage.setItem(`${token}:current`, String(currentBall));
  },
  delete: () => {
    const token = localStorage.getItem(PATH_TOKEN);
    localStorage.removeItem(PATH_TOKEN);
    localStorage.removeItem(`${token}:balls`);
  },
});

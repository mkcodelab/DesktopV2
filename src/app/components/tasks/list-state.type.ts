
export type ListFetchingError = { status: number; message: string };

type IdleState = {
  state: 'idle';
};
type LoadingState = {
  state: 'loading';
};
type SuccessState<T> = {
  state: 'success';
  results: T[];
};
type ErrorState = {
  state: 'error';
  error: ListFetchingError;
};

export type TaskListState<T> = IdleState | LoadingState | SuccessState<T> | ErrorState;
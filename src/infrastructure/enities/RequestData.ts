export interface IRequestData<A extends string, P> {
  action: A;
  params?: P;
}

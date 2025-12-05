export function classNamePropAdapter<State>(
  className?: string | ((state: State) => string | undefined)
) {
  return typeof className === 'function' ? className({} as State) : className;
}

import { useLogout } from '../AuthQuery'

export const Logout = () => {
  const logout = useLogout()

  return (
    <button onClick={() => logout.mutate()}>ログアウト</button>
  )
}
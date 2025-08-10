export function Footer() {
  return (
    <footer className="py-6 font-medium text-muted-foreground text-sm">
      <span className="flex items-center justify-center">
        Copyright &copy; {new Date().getFullYear()} - Odonto
        <p className="block font-medium text-primary">PRO</p>
      </span>
    </footer>
  )
}

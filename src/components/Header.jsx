function Header() {
  return (
    <header className='bg-gray-800 shadow-md'>
      <div className='container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center'>
        <div className='flex items-center space-x-2 mb-4 sm:mb-0'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-8 w-8 text-purple-500'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h-2v-2h2zm-2-2h2v-2h-2v2zm-4 4h2v-2h-2v2zm0-4h2v-2h-2v2zM9 9h2V7H9v2zm-4 4h2v-2H5v2zm0-4h2V7H5v2z'
              clipRule='evenodd'
            />
          </svg>
          <h1 className='text-xl font-bold'>MovieMatcher</h1>
        </div>
        <nav>
          <ul className='flex space-x-6'>
            <li>
              <a href='#' className='hover:text-purple-400 transition-colors'>
                Home
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-purple-400 transition-colors'>
                Trending
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-purple-400 transition-colors'>
                About
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;

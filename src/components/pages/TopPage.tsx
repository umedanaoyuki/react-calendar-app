export const TopPage = () => {
  return (
    <div className="relative">
      <header className="leading-[50px] fixed top-0 left-0 right-0">
        <div className="container mx-auto flex justify-between">
          <p className="logo">スケジュール管理APP</p>
          <nav>
            <ul className="flex gap-5 text-lime-800">
              <li>ご利用方法</li>
              <li>ログイン</li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

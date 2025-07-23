const months = [
   'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
   'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

export function formatDate(dateString: string): string {
   const date = new Date(dateString);
   const day = date.getDate();
   const month = months[date.getMonth()];
   const year = date.getFullYear();
   const currentYear = new Date().getFullYear();

   return year === currentYear ? `${day} ${month}` : `${day} ${month} ${year}`;
}
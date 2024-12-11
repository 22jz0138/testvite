const CardIcon = ({ isActive }) => (
    <svg
      width="65"
      height="65"
      viewBox="0 0 65 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="32.5" cy="32.5" r="32.5" fill={isActive ? "#D9D9D9": "#ffc042"} />
        <circle cx="32.5" cy="32.5" r="32.5" fill={isActive ? "#D9D9D9": "#ffc042"}/>
        <path d="M13 19.1667C13 18.0616 13.4741 17.0018 14.318 16.2204C15.1619 15.439 16.3065 15 17.5 15H26.5C27.6935 15 28.8381 15.439 29.682 16.2204C30.5259 17.0018 31 18.0616 31 19.1667V27.5C31 28.6051 30.5259 29.6649 29.682 30.4463C28.8381 31.2277 27.6935 31.6667 26.5 31.6667H17.5C16.3065 31.6667 15.1619 31.2277 14.318 30.4463C13.4741 29.6649 13 28.6051 13 27.5V19.1667ZM17.5 17.0833C16.9033 17.0833 16.331 17.3028 15.909 17.6935C15.4871 18.0842 15.25 18.6141 15.25 19.1667V27.5C15.25 28.0525 15.4871 28.5824 15.909 28.9731C16.331 29.3638 16.9033 29.5833 17.5 29.5833H26.5C27.0967 29.5833 27.669 29.3638 28.091 28.9731C28.5129 28.5824 28.75 28.0525 28.75 27.5V19.1667C28.75 18.6141 28.5129 18.0842 28.091 17.6935C27.669 17.3028 27.0967 17.0833 26.5 17.0833H17.5Z" fill="white"/>
        <path d="M13 38.1667C13 37.0616 13.4741 36.0018 14.318 35.2204C15.1619 34.439 16.3065 34 17.5 34H26.5C27.6935 34 28.8381 34.439 29.682 35.2204C30.5259 36.0018 31 37.0616 31 38.1667V46.5C31 47.6051 30.5259 48.6649 29.682 49.4463C28.8381 50.2277 27.6935 50.6667 26.5 50.6667H17.5C16.3065 50.6667 15.1619 50.2277 14.318 49.4463C13.4741 48.6649 13 47.6051 13 46.5V38.1667ZM17.5 36.0833C16.9033 36.0833 16.331 36.3028 15.909 36.6935C15.4871 37.0842 15.25 37.6141 15.25 38.1667V46.5C15.25 47.0525 15.4871 47.5824 15.909 47.9731C16.331 48.3638 16.9033 48.5833 17.5 48.5833H26.5C27.0967 48.5833 27.669 48.3638 28.091 47.9731C28.5129 47.5824 28.75 47.0525 28.75 46.5V38.1667C28.75 37.6141 28.5129 37.0842 28.091 36.6935C27.669 36.3028 27.0967 36.0833 26.5 36.0833H17.5Z" fill="white"/>
        <path d="M34 19.1667C34 18.0616 34.4741 17.0018 35.318 16.2204C36.1619 15.439 37.3065 15 38.5 15H47.5C48.6935 15 49.8381 15.439 50.682 16.2204C51.5259 17.0018 52 18.0616 52 19.1667V27.5C52 28.6051 51.5259 29.6649 50.682 30.4463C49.8381 31.2277 48.6935 31.6667 47.5 31.6667H38.5C37.3065 31.6667 36.1619 31.2277 35.318 30.4463C34.4741 29.6649 34 28.6051 34 27.5V19.1667ZM38.5 17.0833C37.9033 17.0833 37.331 17.3028 36.909 17.6935C36.4871 18.0842 36.25 18.6141 36.25 19.1667V27.5C36.25 28.0525 36.4871 28.5824 36.909 28.9731C37.331 29.3638 37.9033 29.5833 38.5 29.5833H47.5C48.0967 29.5833 48.669 29.3638 49.091 28.9731C49.5129 28.5824 49.75 28.0525 49.75 27.5V19.1667C49.75 18.6141 49.5129 18.0842 49.091 17.6935C48.669 17.3028 48.0967 17.0833 47.5 17.0833H38.5Z" fill="white"/>
        <path d="M34 38.1667C34 37.0616 34.4741 36.0018 35.318 35.2204C36.1619 34.439 37.3065 34 38.5 34H47.5C48.6935 34 49.8381 34.439 50.682 35.2204C51.5259 36.0018 52 37.0616 52 38.1667V46.5C52 47.6051 51.5259 48.6649 50.682 49.4463C49.8381 50.2277 48.6935 50.6667 47.5 50.6667H38.5C37.3065 50.6667 36.1619 50.2277 35.318 49.4463C34.4741 48.6649 34 47.6051 34 46.5V38.1667ZM38.5 36.0833C37.9033 36.0833 37.331 36.3028 36.909 36.6935C36.4871 37.0842 36.25 37.6141 36.25 38.1667V46.5C36.25 47.0525 36.4871 47.5824 36.909 47.9731C37.331 48.3638 37.9033 48.5833 38.5 48.5833H47.5C48.0967 48.5833 48.669 48.3638 49.091 47.9731C49.5129 47.5824 49.75 47.0525 49.75 46.5V38.1667C49.75 37.6141 49.5129 37.0842 49.091 36.6935C48.669 36.3028 48.0967 36.0833 47.5 36.0833H38.5Z" fill="white"/>
        <circle cx="32.5" cy="32.5" r="32.5" fill={isActive ? "#D9D9D9": "#ffc042"}/>
        <path d="M13 19.1667C13 18.0616 13.4741 17.0018 14.318 16.2204C15.1619 15.439 16.3065 15 17.5 15H26.5C27.6935 15 28.8381 15.439 29.682 16.2204C30.5259 17.0018 31 18.0616 31 19.1667V27.5C31 28.6051 30.5259 29.6649 29.682 30.4463C28.8381 31.2277 27.6935 31.6667 26.5 31.6667H17.5C16.3065 31.6667 15.1619 31.2277 14.318 30.4463C13.4741 29.6649 13 28.6051 13 27.5V19.1667ZM17.5 17.0833C16.9033 17.0833 16.331 17.3028 15.909 17.6935C15.4871 18.0842 15.25 18.6141 15.25 19.1667V27.5C15.25 28.0525 15.4871 28.5824 15.909 28.9731C16.331 29.3638 16.9033 29.5833 17.5 29.5833H26.5C27.0967 29.5833 27.669 29.3638 28.091 28.9731C28.5129 28.5824 28.75 28.0525 28.75 27.5V19.1667C28.75 18.6141 28.5129 18.0842 28.091 17.6935C27.669 17.3028 27.0967 17.0833 26.5 17.0833H17.5Z" fill="white"/>
        <path d="M13 38.1667C13 37.0616 13.4741 36.0018 14.318 35.2204C15.1619 34.439 16.3065 34 17.5 34H26.5C27.6935 34 28.8381 34.439 29.682 35.2204C30.5259 36.0018 31 37.0616 31 38.1667V46.5C31 47.6051 30.5259 48.6649 29.682 49.4463C28.8381 50.2277 27.6935 50.6667 26.5 50.6667H17.5C16.3065 50.6667 15.1619 50.2277 14.318 49.4463C13.4741 48.6649 13 47.6051 13 46.5V38.1667ZM17.5 36.0833C16.9033 36.0833 16.331 36.3028 15.909 36.6935C15.4871 37.0842 15.25 37.6141 15.25 38.1667V46.5C15.25 47.0525 15.4871 47.5824 15.909 47.9731C16.331 48.3638 16.9033 48.5833 17.5 48.5833H26.5C27.0967 48.5833 27.669 48.3638 28.091 47.9731C28.5129 47.5824 28.75 47.0525 28.75 46.5V38.1667C28.75 37.6141 28.5129 37.0842 28.091 36.6935C27.669 36.3028 27.0967 36.0833 26.5 36.0833H17.5Z" fill="white"/>
        <path d="M34 19.1667C34 18.0616 34.4741 17.0018 35.318 16.2204C36.1619 15.439 37.3065 15 38.5 15H47.5C48.6935 15 49.8381 15.439 50.682 16.2204C51.5259 17.0018 52 18.0616 52 19.1667V27.5C52 28.6051 51.5259 29.6649 50.682 30.4463C49.8381 31.2277 48.6935 31.6667 47.5 31.6667H38.5C37.3065 31.6667 36.1619 31.2277 35.318 30.4463C34.4741 29.6649 34 28.6051 34 27.5V19.1667ZM38.5 17.0833C37.9033 17.0833 37.331 17.3028 36.909 17.6935C36.4871 18.0842 36.25 18.6141 36.25 19.1667V27.5C36.25 28.0525 36.4871 28.5824 36.909 28.9731C37.331 29.3638 37.9033 29.5833 38.5 29.5833H47.5C48.0967 29.5833 48.669 29.3638 49.091 28.9731C49.5129 28.5824 49.75 28.0525 49.75 27.5V19.1667C49.75 18.6141 49.5129 18.0842 49.091 17.6935C48.669 17.3028 48.0967 17.0833 47.5 17.0833H38.5Z" fill="white"/>
        <path d="M34 38.1667C34 37.0616 34.4741 36.0018 35.318 35.2204C36.1619 34.439 37.3065 34 38.5 34H47.5C48.6935 34 49.8381 34.439 50.682 35.2204C51.5259 36.0018 52 37.0616 52 38.1667V46.5C52 47.6051 51.5259 48.6649 50.682 49.4463C49.8381 50.2277 48.6935 50.6667 47.5 50.6667H38.5C37.3065 50.6667 36.1619 50.2277 35.318 49.4463C34.4741 48.6649 34 47.6051 34 46.5V38.1667ZM38.5 36.0833C37.9033 36.0833 37.331 36.3028 36.909 36.6935C36.4871 37.0842 36.25 37.6141 36.25 38.1667V46.5C36.25 47.0525 36.4871 47.5824 36.909 47.9731C37.331 48.3638 37.9033 48.5833 38.5 48.5833H47.5C48.0967 48.5833 48.669 48.3638 49.091 47.9731C49.5129 47.5824 49.75 47.0525 49.75 46.5V38.1667C49.75 37.6141 49.5129 37.0842 49.091 36.6935C48.669 36.3028 48.0967 36.0833 47.5 36.0833H38.5Z" fill="white"/>
    </svg>
  );

  export default CardIcon;

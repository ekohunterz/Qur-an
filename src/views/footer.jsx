export default function Footer() {
  return (
    <footer className="py-3 bottom-0 mt-5 " style={{ backgroundColor: "#E4DACE" }}>
      <p className="text-center text-muted ">
        &copy; 2023 Eko Teguh Muhammadi |{" "}
        <a className="text-decoration-none" href="https://equran.id/apidev">
          API Qur'an
        </a>{" "}
        |
        <a className="text-decoration-none" href="https://documenter.getpostman.com/view/841292/Tz5p7yHS">
          {" "}
          API Jadwal Shalat
        </a>{" "}
        |
        <a className="text-decoration-none" href="https://github.com/ekohunterz/Qur-an-react">
          {" "}
          Github
        </a>
      </p>
    </footer>
  );
}

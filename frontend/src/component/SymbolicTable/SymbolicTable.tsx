import styles from './SymbolicTable.module.scss';
import classNames from "classnames/bind";
import { FaRegStar } from "react-icons/fa";
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

type TableProps = {
  title: string;
  path?: string;
  background?: any;
}

const SymbolicTable = ({ title, path = "", background = "" }: TableProps) => {
  return (
    <>
      <Link to={path} className={cx("table-title")} style={{
        backgroundImage: `url(${background.replaceAll("\\","\\\\")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        objectFit: "cover"
      }}>
        <div className={cx('table-title-details')}>
          <h4 className={cx("table-title-details-name")}>{title}</h4>
          <div className={cx("table-title-details-option")}>
            <span>
              <FaRegStar />
            </span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default SymbolicTable;

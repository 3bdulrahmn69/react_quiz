import PropTypes from 'prop-types';

const Main = ({ children }) => {
  return <main className="main">{children}</main>;
};

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Main;

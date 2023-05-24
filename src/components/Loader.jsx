import { MagnifyingGlass } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div style={{ display: 'block', margin: 'auto', width: '100px' }}>
      <MagnifyingGlass
        visible={true}
        height="100"
        width="100"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#e15b64"
      />
    </div>
  );
};

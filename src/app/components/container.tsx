import React from 'react';

const Container = ({children}: {children: React.ReactNode}) => {
    return (
        <div className={"mx-auto max-w-[1100px] flex-1 flex items-center py-6"}>
            {children}
        </div>
    );
};

export default Container;
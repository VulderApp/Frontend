import React, { ReactElement, useEffect } from "react";
import ContributorList from "../../components/about/contributors/ContributorList";
import { useSetRecoilState } from "recoil";
import { appbarTitle } from "../../states";

const Contributors = (): ReactElement => {
  const setAppbarTitle = useSetRecoilState(appbarTitle);

  useEffect(() => {
    setAppbarTitle("Contributors");
  });

  return <ContributorList />;
};

export default Contributors;

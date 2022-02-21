import React, { ReactElement, useEffect } from "react";
import ContributorList from "../../components/about/contributors/ContributorList";
import { useSetRecoilState } from "recoil";
import { appbarTitle } from "../../states";
import i18next from "../../i18n";
import { changeTitle } from "../../utils/titleUtil";

const Contributors = (): ReactElement => {
  const setAppbarTitle = useSetRecoilState(appbarTitle);

  useEffect(() => {
    setAppbarTitle(i18next.t("contributorsLabel"));
    document.title = changeTitle(i18next.t("contributorsLabel"));
  });

  return <ContributorList />;
};

export default Contributors;

export interface ResultsHeaderInterface {
  url: string;
  isScanned: boolean;
}

export interface JsonDataFormat {
 testregelId: string;
  nettlesar: string | null;
  utvidelse: string | null;
  side: string;
  element: string;
  samsvar: string;
  utfall: string;
  kommentar: string;
}

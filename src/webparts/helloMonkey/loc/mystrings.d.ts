declare interface IHelloMonkeyWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'HelloMonkeyWebPartStrings' {
  const strings: IHelloMonkeyWebPartStrings;
  export = strings;
}

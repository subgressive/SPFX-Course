import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './NasaApolloMissionViewerWebPart.module.scss';
import * as strings from 'NasaApolloMissionViewerWebPartStrings';

export interface INasaApolloMissionViewerWebPartProps {
  description: string;
  selectedMission : string;
}

import { IMission } from '../../models';
import { MissionService } from '../../services';

export default class NasaApolloMissionViewerWebPartWebPart extends BaseClientSideWebPart<INasaApolloMissionViewerWebPartProps> {

  private selectedMission: IMission;
  
  protected onInit(): Promise<void>{
    return new Promise<void>(
      (
        resolve: () => void,
        reject: (error: any) => void
      ): void => {
        this.selectedMission = this._getSelectedMission();
        resolve();  
      }
    );
  }  

  private missionDetailelement: HTMLElement;
  
  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.nasaApolloMissionViewer}">
        <div class="${styles.container}">
          <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
            <div class="ms-Grid-col ms-lg10 ms-xl8 ms-xlPush2 ms-lgPush1">
              <span class="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
              <p class="ms-font-l ms-fontColor-white">Customize SharePoint experiences using Web Parts.</p>
              <p class="ms-font-l ms-fontColor-white">${escape(this.properties.description)}</p>
              <div id="apolloMissionDetail"></div>
            </div>
          </div>
        </div>
      </div>`;
    this.missionDetailelement = document.getElementById('apolloMissionDetail');

    // show mission details if one found, otherwise show empty
    if (this.selectedMission) {
      this._renderMissionDetails(this.missionDetailelement, this.selectedMission);
    } else {
      this.missionDetailelement.innerHTML = '';
    }
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('selectedMission', {
                  label: 'Enter mission to display'
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private _getSelectedMission(): IMission {
    const selectedMissionId: string = (this.properties.selectedMission)
    ? this.properties.selectedMission : 'AS-507';

    return MissionService.getMission(selectedMissionId);
  }

    /**
   * Display the specified mission details in the provided DOM element.
   *
   * @private
   * @param {HTMLElement} element   DOM element where the details should be written to.
   * @param {IMission}    mission   Apollo mission to display.
   * @memberof ApolloViewerWebPart
   */
  private _renderMissionDetails(element: HTMLElement, mission: IMission): void {
    element.innerHTML = `
      <p class="ms-font-m">
        <span class="ms-fontWeight-semibold">Mission: </span>
        ${escape(mission.name)}
      </p>
      <p class="ms-font-m">
        <span class="ms-fontWeight-semibold">Duration: </span>
        ${escape(this._getMissionTimeline(mission))}
      </p>
      <a href="${mission.wiki_href}" target="_blank" class="${styles.button}">
        <span class="${styles.label}">Learn more about ${escape(mission.name)} on Wikipedia &raquo;</span>
      </a>`;
  }

  /**
   * Returns the duration of the mission.
   *
   * @private
   * @param     {IMission}  mission  Apollo mission to use.
   * @returns   {string}             Mission duration range in the format of [start] - [end].
   * @memberof  ApolloViewerWebPart
   */
  private _getMissionTimeline(mission: IMission): string {
    let missionDate = mission.end_date !== ''
      ? `${mission.launch_date.toString()} - ${mission.end_date.toString()}`
      : `${mission.launch_date.toString()}`;
    return missionDate;
  }

}

import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './JQueryDataTablesWebPart.module.scss';
import * as strings from 'JQueryDataTablesWebPartStrings';

import { SPComponentLoader } from '@microsoft/sp-loader';

import * as $ from 'jquery';
require('datatables');

import { IMission } from '../../models';
import { MissionService } from '../../services';

export interface IJQueryDataTablesWebPartProps {
  description: string;
}

export default class JQueryDataTablesWebPartWebPart extends BaseClientSideWebPart<IJQueryDataTablesWebPartProps> {

  private missions: IMission[] = [];

  protected onInit(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      // load css for datatales
      SPComponentLoader.loadCss('https://cdn.datatables.net/1.10.12/css/jquery.dataTables.min.css');
      // get non-test booster missions
      this.missions = MissionService.getMissions()
        .filter((mission: IMission) => {
          return (mission.name.length > 0)
        });
      resolve();  
    });
  }


  public render(): void {
    if (this.renderedOnce === false){
      this.domElement.innerHTML = `
      <table class="${styles.jQueryDataTables}">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Launch Date</th>
            <th>End Date</th>
          </tr>
        </thead>
      </table>
      `;
    }

    // get reference to HTML table
    let container: JQuery = $(`.${styles.jQueryDataTables}`, this.domElement);
    
    // convert HTML table to datatable
    (container as any).DataTable({
      data: this.missions,
      columns: [
        { "data": "id"},
        { "data": "name"},
        { "data": "launch_date"},
        { "data": "end_date"}
      ]
    });
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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

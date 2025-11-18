'use client';

import TechLayout from '@/components/tech-layout';
import { useState, useEffect } from 'react';
import Image from 'next/image';

type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

const ImageGallery = ({ images }: { images: GalleryImage[] }) => {
  if (!images.length) return null;

  return (
    <div className="flex flex-col gap-8 mt-8">
      {images.map((image, index) => (
        <figure
          key={`${image.src}-${index}`}
          className="overflow-hidden rounded-2xl border border-gray-600 bg-white shadow-lg shadow-blue-500/10 transition hover:shadow-blue-500/25"
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading="lazy"
            sizes="(min-width: 1280px) 100vw, (min-width: 768px) 100vw, 100vw"
            className="h-auto w-full object-contain bg-white"
          />
          {image.caption && (
            <figcaption className="border-t border-gray-300 px-4 py-3 text-sm text-gray-700">
              {image.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
};

const azureImages: Record<string, GalleryImage> = {
  image1: { src: '/tutorials/azure/images/image1.png', width: 1658, height: 478, alt: 'Azure portal management groups cards' },
  image2: { src: '/tutorials/azure/images/image2.png', width: 1653, height: 839, alt: 'Azure hierarchy view screenshot' },
  image3: { src: '/tutorials/azure/images/image3.png', width: 1653, height: 463, alt: 'Azure subscriptions blade list' },
  image4: { src: '/tutorials/azure/images/image4.png', width: 1797, height: 606, alt: 'Diagram of management groups and subscriptions' },
  image5: { src: '/tutorials/azure/images/image5.png', width: 1666, height: 512, alt: 'Resource groups overview screen' },
  image6: { src: '/tutorials/azure/images/image6.png', width: 1648, height: 458, alt: 'Resource group resources list' },
  image7: { src: '/tutorials/azure/images/image7.png', width: 1663, height: 474, alt: 'Search for resource groups in Azure portal' },
  image8: { src: '/tutorials/azure/images/image8.png', width: 1641, height: 915, alt: 'Create resource group basics tab' },
  image9: { src: '/tutorials/azure/images/image9.png', width: 1622, height: 914, alt: 'Resource group creation form details' },
  image10: { src: '/tutorials/azure/images/image10.png', width: 784, height: 920, alt: 'Review and create page for resource group' },
  image11: { src: '/tutorials/azure/images/image11.png', width: 1638, height: 409, alt: 'Search storage accounts in Azure portal' },
  image12: { src: '/tutorials/azure/images/image12.png', width: 1665, height: 411, alt: 'Storage accounts list with create button' },
  image13: { src: '/tutorials/azure/images/image13.png', width: 1113, height: 923, alt: 'Storage account basics configuration' },
  image14: { src: '/tutorials/azure/images/image14.png', width: 1247, height: 911, alt: 'Subscription selection step' },
  image15: { src: '/tutorials/azure/images/image15.png', width: 1505, height: 671, alt: 'Choose resource group for storage account' },
  image16: { src: '/tutorials/azure/images/image16.png', width: 1661, height: 514, alt: 'Resource group showing created storage account' },
  image17: { src: '/tutorials/azure/images/image17.png', width: 1677, height: 904, alt: 'Azure storage services comparison graphic' },
  image18: { src: '/tutorials/azure/images/image18.png', width: 1659, height: 899, alt: 'Storage account overview blade' },
  image19: { src: '/tutorials/azure/images/image19.png', width: 1376, height: 657, alt: 'Containers tab inside storage account' },
  image20: { src: '/tutorials/azure/images/image20.png', width: 1665, height: 614, alt: 'Create container dialog' },
  image21: { src: '/tutorials/azure/images/image21.png', width: 1659, height: 544, alt: 'Container list after creation' },
  image22: { src: '/tutorials/azure/images/image22.png', width: 1918, height: 535, alt: 'Upload dialog for blobs' },
  image23: { src: '/tutorials/azure/images/image23.png', width: 1645, height: 591, alt: 'Blob container contents view' },
  image24: { src: '/tutorials/azure/images/image24.png', width: 1920, height: 600, alt: 'Blob properties panel' },
  image25: { src: '/tutorials/azure/images/image25.png', width: 1920, height: 870, alt: 'Change blob access tier dialog' },
  image26: { src: '/tutorials/azure/images/image26.png', width: 1920, height: 609, alt: 'Blob storage hierarchy diagram' },
  image27: { src: '/tutorials/azure/images/image27.png', width: 1668, height: 583, alt: 'Azure blob storage architecture graphic' },
  image28: { src: '/tutorials/azure/images/image28.png', width: 737, height: 584, alt: 'Blob types comparison table' },
  image29: { src: '/tutorials/azure/images/image29.png', width: 733, height: 859, alt: 'Block blob illustration' },
  image30: { src: '/tutorials/azure/images/image30.png', width: 1920, height: 535, alt: 'Block blob workflow diagram' },
  image31: { src: '/tutorials/azure/images/image31.png', width: 731, height: 860, alt: 'Append blob architecture diagram' },
  image32: { src: '/tutorials/azure/images/image32.png', width: 1920, height: 535, alt: 'Storage access tier comparison chart' },
  image33: { src: '/tutorials/azure/images/image33.png', width: 1669, height: 350, alt: 'Search storage accounts for ADLS' },
  image34: { src: '/tutorials/azure/images/image34.png', width: 1233, height: 920, alt: 'ADLS storage account basics tab' },
  image35: { src: '/tutorials/azure/images/image35.png', width: 1241, height: 916, alt: 'ADLS advanced settings screen' },
  image36: { src: '/tutorials/azure/images/image36.png', width: 1257, height: 914, alt: 'ADLS networking configuration' },
  image37: { src: '/tutorials/azure/images/image37.png', width: 1495, height: 617, alt: 'ADLS review and create screen' },
  image38: { src: '/tutorials/azure/images/image38.png', width: 1669, height: 650, alt: 'Resource group showing ADLS account' },
  image39: { src: '/tutorials/azure/images/image39.png', width: 1714, height: 915, alt: 'Data lake services comparison graphic' },
  image40: { src: '/tutorials/azure/images/image40.png', width: 1669, height: 913, alt: 'ADLS storage account overview' },
  image41: { src: '/tutorials/azure/images/image41.png', width: 1377, height: 618, alt: 'ADLS containers tab view' },
  image42: { src: '/tutorials/azure/images/image42.png', width: 1678, height: 546, alt: 'Create ADLS container modal' },
  image43: { src: '/tutorials/azure/images/image43.png', width: 1650, height: 550, alt: 'ADLS container list view' },
  image44: { src: '/tutorials/azure/images/image44.png', width: 1376, height: 621, alt: 'ADLS upload dialog' },
  image45: { src: '/tutorials/azure/images/image45.png', width: 1656, height: 536, alt: 'ADLS blob details view' },
  image46: { src: '/tutorials/azure/images/image46.png', width: 1914, height: 863, alt: 'ADLS folder structure screenshot' },
  image47: { src: '/tutorials/azure/images/image47.png', width: 1652, height: 573, alt: 'Create subfolder in ADLS container' },
  image48: { src: '/tutorials/azure/images/image48.png', width: 1920, height: 592, alt: 'ADLS file upload dialog' },
  image49: { src: '/tutorials/azure/images/image49.png', width: 1918, height: 763, alt: 'Select files to upload in ADLS' },
  image50: { src: '/tutorials/azure/images/image50.png', width: 1920, height: 567, alt: 'ADLS upload progress screen' },
  image51: { src: '/tutorials/azure/images/image51.png', width: 1669, height: 591, alt: 'ADLS uploaded file details' },
  image52: { src: '/tutorials/azure/images/image52.png', width: 1669, height: 591, alt: 'ADLS blob types comparison table' },
  image53: { src: '/tutorials/azure/images/image53.png', width: 1669, height: 591, alt: 'ADLS access tier comparison chart' },
  // Azure Databricks images
  image54: { src: '/tutorials/azure/images/image54.png', width: 1920, height: 1080, alt: 'Azure Databricks introduction' },
  image55: { src: '/tutorials/azure/images/image55.png', width: 1920, height: 1080, alt: 'Azure Databricks architecture' },
  image56: { src: '/tutorials/azure/images/image56.png', width: 1920, height: 1080, alt: 'Databricks use cases' },
  image57: { src: '/tutorials/azure/images/image57.png', width: 1920, height: 1080, alt: 'Core components' },
  image58: { src: '/tutorials/azure/images/image58.png', width: 1920, height: 1080, alt: 'Databricks advantages' },
  image59: { src: '/tutorials/azure/images/image59.png', width: 1920, height: 1080, alt: 'Databricks overview' },
  image60: { src: '/tutorials/azure/images/image60.png', width: 1920, height: 1080, alt: 'Create Azure Databricks workspace' },
  image61: { src: '/tutorials/azure/images/image61.png', width: 1920, height: 1080, alt: 'Databricks workspace' },
  image62: { src: '/tutorials/azure/images/image62.png', width: 1920, height: 1080, alt: 'Databricks features' },
  image63: { src: '/tutorials/azure/images/image63.png', width: 1920, height: 1080, alt: 'Databricks SQL overview' },
  image64: { src: '/tutorials/azure/images/image64.png', width: 1920, height: 1080, alt: 'SQL Editor' },
  image65: { src: '/tutorials/azure/images/image65.png', width: 1920, height: 1080, alt: 'Dashboards' },
  image66: { src: '/tutorials/azure/images/image66.png', width: 1920, height: 1080, alt: 'Genie AI assistant' },
  image67: { src: '/tutorials/azure/images/image67.png', width: 1920, height: 1080, alt: 'Alerts configuration' },
  image68: { src: '/tutorials/azure/images/image68.png', width: 1920, height: 1080, alt: 'Query history' },
  image69: { src: '/tutorials/azure/images/image69.png', width: 1920, height: 1080, alt: 'SQL Data Warehouse' },
  image70: { src: '/tutorials/azure/images/image70.png', width: 1920, height: 1080, alt: 'Azure Databricks image 70' },
  image71: { src: '/tutorials/azure/images/image71.png', width: 1920, height: 1080, alt: 'Azure Databricks image 71' },
  image72: { src: '/tutorials/azure/images/image72.png', width: 1920, height: 1080, alt: 'Azure Databricks image 72' },
  image73: { src: '/tutorials/azure/images/image73.png', width: 1920, height: 1080, alt: 'Azure Databricks image 73' },
  image74: { src: '/tutorials/azure/images/image74.png', width: 1920, height: 1080, alt: 'Azure Databricks image 74' },
  image75: { src: '/tutorials/azure/images/image75.png', width: 1920, height: 1080, alt: 'Azure Databricks image 75' },
  image76: { src: '/tutorials/azure/images/image76.png', width: 1920, height: 1080, alt: 'Azure Databricks image 76' },
  image77: { src: '/tutorials/azure/images/image77.png', width: 1920, height: 1080, alt: 'Azure Databricks image 77' },
  image78: { src: '/tutorials/azure/images/image78.png', width: 1920, height: 1080, alt: 'Azure Databricks image 78' },
  image79: { src: '/tutorials/azure/images/image79.png', width: 1920, height: 1080, alt: 'Azure Databricks image 79' },
  image80: { src: '/tutorials/azure/images/image80.png', width: 1920, height: 1080, alt: 'Azure Databricks image 80' },
  image81: { src: '/tutorials/azure/images/image81.png', width: 1920, height: 1080, alt: 'Azure Databricks image 81' },
  image82: { src: '/tutorials/azure/images/image82.png', width: 1920, height: 1080, alt: 'Azure Databricks image 82' },
  image83: { src: '/tutorials/azure/images/image83.png', width: 1920, height: 1080, alt: 'Azure Databricks image 83' },
  image84: { src: '/tutorials/azure/images/image84.png', width: 1920, height: 1080, alt: 'Azure Databricks image 84' },
  // Images from 2.Azure Databricks.docx document (image85-image115)
  // Individual step images for "How to Create" - extracted from document
  db_step1: { src: '/tutorials/azure/images/db_step1.png', width: 1920, height: 1080, alt: 'Azure portal search for Databricks' },
  db_step2: { src: '/tutorials/azure/images/db_step2.png', width: 1920, height: 1080, alt: 'Click on create' },
  db_step3: { src: '/tutorials/azure/images/db_step3.png', width: 1920, height: 1080, alt: 'Create databricks' },
  db_step4: { src: '/tutorials/azure/images/db_step4.png', width: 1920, height: 1080, alt: 'Subscription selection' },
  db_step5: { src: '/tutorials/azure/images/db_step5.png', width: 1920, height: 1080, alt: 'Resource Group configuration' },
  db_step6: { src: '/tutorials/azure/images/db_step6.png', width: 1920, height: 1080, alt: 'Workspace Name setup' },
  db_step7: { src: '/tutorials/azure/images/db_step7.png', width: 1920, height: 1080, alt: 'Region selection' },
  db_step8: { src: '/tutorials/azure/images/db_step8.png', width: 1920, height: 1080, alt: 'Pricing Tier' },
  db_step9: { src: '/tutorials/azure/images/db_step9.png', width: 1920, height: 1080, alt: 'Managed Resource Group Name' },
  db_step10: { src: '/tutorials/azure/images/db_step10.png', width: 1920, height: 1080, alt: 'Final Step - Review + Create' },
  
  // Individual images for Workspace Overview (from document)
  db_workspace_overview_1: { src: '/tutorials/azure/images/db_workspace_overview_1.png', width: 1920, height: 1080, alt: 'Databricks Workspace - Click on workspace' },
  db_workspace_overview_2: { src: '/tutorials/azure/images/db_workspace_overview_2.png', width: 1920, height: 1080, alt: 'Databricks Workspace - Launch workspace button' },
  db_workspace_overview_3: { src: '/tutorials/azure/images/db_indiv_1.png', width: 1920, height: 1080, alt: 'Databricks Workspace - Overview' },
  
  // Individual images for Workspace Features (7 images)
  db_workspace_1: { src: '/tutorials/azure/images/db_indiv_2.png', width: 1920, height: 1080, alt: 'Workspace - Top bar' },
  db_workspace_2: { src: '/tutorials/azure/images/db_indiv_3.png', width: 1920, height: 1080, alt: 'Workspace - Home and Shared' },
  db_workspace_3: { src: '/tutorials/azure/images/db_indiv_4.png', width: 1920, height: 1080, alt: 'Workspace - Favorites and Trash' },
  db_workspace_4: { src: '/tutorials/azure/images/db_indiv_5.png', width: 1920, height: 1080, alt: 'Workspace - Users folder' },
  db_workspace_5: { src: '/tutorials/azure/images/db_indiv_6.png', width: 1920, height: 1080, alt: 'Workspace - User folders' },
  db_workspace_6: { src: '/tutorials/azure/images/db_indiv_7.png', width: 1920, height: 1080, alt: 'Workspace - Shared folder' },
  db_workspace_7: { src: '/tutorials/azure/images/db_indiv_8.png', width: 1920, height: 1080, alt: 'Workspace - Additional features' },
  
  // Individual images for Notebook (4 images)
  db_notebook_1: { src: '/tutorials/azure/images/db_indiv_3.png', width: 1920, height: 1080, alt: 'Notebook - Create options' },
  db_notebook_2: { src: '/tutorials/azure/images/db_indiv_4.png', width: 1920, height: 1080, alt: 'Notebook - Interface' },
  db_notebook_3: { src: '/tutorials/azure/images/db_indiv_9.png', width: 1920, height: 1080, alt: 'Notebook - Creation' },
  db_notebook_4: { src: '/tutorials/azure/images/db_indiv_10.png', width: 1920, height: 1080, alt: 'Notebook - Recents' },
  
  // Individual images for Catalog (2 images)
  db_catalog_1: { src: '/tutorials/azure/images/db_indiv_11.png', width: 1920, height: 1080, alt: 'Catalog - Unity Catalog interface' },
  db_catalog_2: { src: '/tutorials/azure/images/db_indiv_12.png', width: 1920, height: 1080, alt: 'Catalog - Add Data and Governance' },
  
  // Individual images for Jobs & Pipelines
  db_jobs_1: { src: '/tutorials/azure/images/db_indiv_13.png', width: 1920, height: 1080, alt: 'Jobs and Pipelines' },
  
  // Individual images for Compute
  db_compute_1: { src: '/tutorials/azure/images/db_indiv_14.png', width: 1920, height: 1080, alt: 'Compute Clusters' },
  
  // Individual images for Marketplace
  db_marketplace_1: { src: '/tutorials/azure/images/db_indiv_15.png', width: 1920, height: 1080, alt: 'Marketplace' },
  
  // Individual images for SQL Editor (2 images)
  db_sql_editor_1: { src: '/tutorials/azure/images/db_indiv_16.png', width: 1920, height: 1080, alt: 'SQL Editor' },
  db_sql_editor_2: { src: '/tutorials/azure/images/db_indiv_22.png', width: 1920, height: 1080, alt: 'SQL Editor - SQL Warehouse' },
  
  // Individual images for Queries
  db_queries_1: { src: '/tutorials/azure/images/db_indiv_17.png', width: 1920, height: 1080, alt: 'Queries' },
  
  // Individual images for Dashboards (2 images)
  db_dashboards_1: { src: '/tutorials/azure/images/db_indiv_18.png', width: 1920, height: 1080, alt: 'Dashboards' },
  db_dashboards_2: { src: '/tutorials/azure/images/db_indiv_19.png', width: 1920, height: 1080, alt: 'Dashboards - Features' },
  
  // Individual images for Alerts
  db_alerts_1: { src: '/tutorials/azure/images/db_indiv_20.png', width: 1920, height: 1080, alt: 'Alerts' },
  
  // Individual images for Query History
  db_query_history_1: { src: '/tutorials/azure/images/db_indiv_21.png', width: 1920, height: 1080, alt: 'Query History' },
  
  // Individual images for SQL Warehouse
  db_sql_warehouse_1: { src: '/tutorials/azure/images/db_indiv_22.png', width: 1920, height: 1080, alt: 'SQL Data Warehouse' },
  
  // Images from Azure Databricks -1.docx document
  db1_image1: { src: '/tutorials/azure/images/db1_image1.png', width: 1920, height: 1080, alt: 'Jobs & Pipelines interface' },
  db1_image2: { src: '/tutorials/azure/images/db1_image2.png', width: 1920, height: 1080, alt: 'Job Runs Dashboard' },
  db1_image3: { src: '/tutorials/azure/images/db1_image3.png', width: 1920, height: 1080, alt: 'Data Ingestion interface' },
  db1_image4: { src: '/tutorials/azure/images/db1_image4.png', width: 1920, height: 1080, alt: 'Data Ingestion Connectors' },
  db1_image5: { src: '/tutorials/azure/images/db1_image5.png', width: 1920, height: 1080, alt: 'Data Ingestion Files section' },
  db1_image6: { src: '/tutorials/azure/images/db1_image6.png', width: 1920, height: 1080, alt: 'AI/ML Playground interface' },
  db1_image7: { src: '/tutorials/azure/images/db1_image7.png', width: 1920, height: 1080, alt: 'AI/ML Playground components' },
  db1_image8: { src: '/tutorials/azure/images/db1_image8.png', width: 1920, height: 1080, alt: 'AI/ML Experiments interface' },
  db1_image9: { src: '/tutorials/azure/images/db1_image9.png', width: 1920, height: 1080, alt: 'AI/ML Feature Store' },
  db1_image10: { src: '/tutorials/azure/images/db1_image10.png', width: 1920, height: 1080, alt: 'AI/ML Model Registry' },
  db1_image11: { src: '/tutorials/azure/images/db1_image11.png', width: 1920, height: 1080, alt: 'AI/ML Model details' },
  db1_image12: { src: '/tutorials/azure/images/db1_image12.png', width: 1920, height: 1080, alt: 'AI/ML Model Serving' },
  db1_image13: { src: '/tutorials/azure/images/db1_image13.png', width: 1920, height: 1080, alt: 'AI/ML Serving details' },
  db1_image14: { src: '/tutorials/azure/images/db1_image14.png', width: 1920, height: 1080, alt: 'Additional content 1' },
  db1_image15: { src: '/tutorials/azure/images/db1_image15.png', width: 1920, height: 1080, alt: 'Additional content 2' },
  db1_image16: { src: '/tutorials/azure/images/db1_image16.png', width: 1920, height: 1080, alt: 'Additional content 3' },
  
  image85: { src: '/tutorials/azure/images/image85.png', width: 1920, height: 1080, alt: 'Azure Databricks introduction' },
  image86: { src: '/tutorials/azure/images/image86.png', width: 1920, height: 1080, alt: 'Databricks architecture' },
  image87: { src: '/tutorials/azure/images/image87.png', width: 1920, height: 1080, alt: 'Common use cases' },
  image88: { src: '/tutorials/azure/images/image88.png', width: 1920, height: 1080, alt: 'Core components' },
  image89: { src: '/tutorials/azure/images/image89.png', width: 1920, height: 1080, alt: 'How to create - initial steps' },
  image90: { src: '/tutorials/azure/images/image90.png', width: 1920, height: 1080, alt: 'How to create - workspace configuration' },
  image91: { src: '/tutorials/azure/images/image91.png', width: 1920, height: 1080, alt: 'Workspace overview' },
  image92: { src: '/tutorials/azure/images/image92.png', width: 1920, height: 1080, alt: 'Workspace features' },
  image93: { src: '/tutorials/azure/images/image93.png', width: 1920, height: 1080, alt: 'Notebook creation' },
  image94: { src: '/tutorials/azure/images/image94.png', width: 1920, height: 1080, alt: 'Catalog and features' },
  image95: { src: '/tutorials/azure/images/image95.png', width: 1920, height: 1080, alt: 'Jobs and pipelines' },
  image96: { src: '/tutorials/azure/images/image96.png', width: 1920, height: 1080, alt: 'Job runs dashboard' },
  image97: { src: '/tutorials/azure/images/image97.png', width: 1920, height: 1080, alt: 'Compute clusters' },
  image98: { src: '/tutorials/azure/images/image98.png', width: 1920, height: 1080, alt: 'Marketplace' },
  image99: { src: '/tutorials/azure/images/image99.png', width: 1920, height: 1080, alt: 'SQL Editor' },
  image100: { src: '/tutorials/azure/images/image100.png', width: 1920, height: 1080, alt: 'SQL Editor features' },
  image101: { src: '/tutorials/azure/images/image101.png', width: 1920, height: 1080, alt: 'Queries' },
  image102: { src: '/tutorials/azure/images/image102.png', width: 1920, height: 1080, alt: 'Dashboards' },
  image103: { src: '/tutorials/azure/images/image103.png', width: 1920, height: 1080, alt: 'Legacy dashboards' },
  image104: { src: '/tutorials/azure/images/image104.png', width: 1920, height: 1080, alt: 'Genie AI assistant' },
  image105: { src: '/tutorials/azure/images/image105.png', width: 1920, height: 1080, alt: 'Genie spaces' },
  image106: { src: '/tutorials/azure/images/image106.png', width: 1920, height: 1080, alt: 'Alerts' },
  image107: { src: '/tutorials/azure/images/image107.png', width: 1920, height: 1080, alt: 'Query history' },
  image108: { src: '/tutorials/azure/images/image108.png', width: 1920, height: 1080, alt: 'SQL Data Warehouse' },
  image109: { src: '/tutorials/azure/images/image109.png', width: 1920, height: 1080, alt: 'SQL Warehouse properties' },
  image110: { src: '/tutorials/azure/images/image110.png', width: 1920, height: 1080, alt: 'SQL Warehouse types' },
  image111: { src: '/tutorials/azure/images/image111.png', width: 1920, height: 1080, alt: 'Create SQL Warehouse' },
  image112: { src: '/tutorials/azure/images/image112.png', width: 1920, height: 1080, alt: 'SQL Warehouse features' },
  image113: { src: '/tutorials/azure/images/image113.png', width: 1920, height: 1080, alt: 'Azure Databricks image 113' },
  image114: { src: '/tutorials/azure/images/image114.png', width: 1920, height: 1080, alt: 'Azure Databricks image 114' },
  image115: { src: '/tutorials/azure/images/image115.png', width: 1920, height: 1080, alt: 'Azure Databricks image 115' }
};

const getImages = (...keys: (keyof typeof azureImages)[]): GalleryImage[] =>
  keys.map(key => azureImages[key]).filter(Boolean);

const PAGE_HEADINGS = [
  { id: 'azure-databricks', title: 'Azure Databricks' },
  { id: 'databricks-sql', title: 'Databricks SQL' },
  { id: 'azure-databricks-1', title: 'Data Engineering' }
];

const SUBSECTION_PARENT: Record<string, string> = {
  'azure-hierarchy': 'azure-basics',
  'introduction-to-azure-databricks': 'azure-databricks',
  'databricks-architecture': 'azure-databricks',
  'common-use-cases': 'azure-databricks',
  'core-components': 'azure-databricks',
  'advantages': 'azure-databricks',
  'databricks-overview': 'azure-databricks',
  'how-to-create': 'azure-databricks',
  'workspace-overview': 'azure-databricks',
  'databricks-features': 'azure-databricks',
  'sql-editor': 'databricks-sql',
  'queries': 'databricks-sql',
  'dashboards': 'databricks-sql',
  'genie': 'databricks-sql',
  'alerts': 'databricks-sql',
  'query-history': 'databricks-sql',
  'sql-data-warehouse': 'databricks-sql',
  'data-engineering': 'azure-databricks-1',
  'jobs-runs': 'azure-databricks-1',
  'data-ingestion': 'azure-databricks-1',
  'ai-ml': 'azure-databricks-1',
  'playground': 'azure-databricks-1',
  'experiments': 'azure-databricks-1',
  'features': 'azure-databricks-1',
  'models': 'azure-databricks-1',
  'serving': 'azure-databricks-1',
  'notebook-level-features': 'azure-databricks-1',
  'file-level-features': 'azure-databricks-1',
  'edit-level-features': 'azure-databricks-1',
  'view-level-features': 'azure-databricks-1',
  'run-level-features': 'azure-databricks-1',
  'help-level-features': 'azure-databricks-1',
  'language-level-features': 'azure-databricks-1',
  'others-features': 'azure-databricks-1'
};

export default function AzureDatabricksPage() {
  const [activeSection, setActiveSection] = useState('azure-databricks');
  const [activeSubsection, setActiveSubsection] = useState<string | null>(null);
  const pageHeadings = PAGE_HEADINGS;

  // Custom setActiveSection that handles child items correctly
  const handleSetActiveSection = (sectionId: string) => {
    // Check if this is a direct section (not a subsection)
    if (PAGE_HEADINGS.some(heading => heading.id === sectionId)) {
      setActiveSection(sectionId);
      setActiveSubsection(null);
      // Update URL hash
      window.history.replaceState(null, '', `#${sectionId}`);
    } else {
      // It's a subsection, find its parent
      const parentSection = SUBSECTION_PARENT[sectionId] || 'azure-databricks';
      setActiveSection(parentSection);
      setActiveSubsection(sectionId);
      // Update URL hash
      window.history.replaceState(null, '', `#${sectionId}`);
    }
  };

  // Handle URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) {
        setActiveSection('azure-databricks');
        setActiveSubsection(null);
        return;
      }

      // Check if hash is a direct section
      if (PAGE_HEADINGS.some(heading => heading.id === hash)) {
        setActiveSection(hash);
        setActiveSubsection(null);
      } else {
        // It's a subsection, find parent
        const parentSection = SUBSECTION_PARENT[hash] || 'azure-basics';
        setActiveSection(parentSection);
        setActiveSubsection(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Scroll to active section after it renders
  useEffect(() => {
    if (activeSection) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        const element = document.getElementById(activeSection);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (activeSubsection) {
          // Try scrolling to subsection if main section not found
          const subElement = document.getElementById(activeSubsection);
          if (subElement) {
            subElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }, 150);
    }
  }, [activeSection, activeSubsection]);

  // Get current section index for navigation
  const getCurrentSectionIndex = () => {
    return PAGE_HEADINGS.findIndex(heading => heading.id === activeSection);
  };

  // Navigation functions
  const goToNextSection = () => {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex < PAGE_HEADINGS.length - 1) {
      const nextSection = PAGE_HEADINGS[currentIndex + 1];
      handleSetActiveSection(nextSection.id);
    }
  };

  const goToPreviousSection = () => {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex > 0) {
      const prevSection = PAGE_HEADINGS[currentIndex - 1];
      handleSetActiveSection(prevSection.id);
    }
  };

  const currentIndex = getCurrentSectionIndex();
  const hasNext = currentIndex < PAGE_HEADINGS.length - 1;
  const hasPrevious = currentIndex > 0;

  return (
    <TechLayout 
      technology="azure-data-engineer" 
      onThisPage={pageHeadings}
      activeSection={activeSection}
      setActiveSection={handleSetActiveSection}
      activeSubsection={activeSubsection}
      setActiveSubsection={setActiveSubsection}
    >
      <div className="min-h-screen">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full border border-blue-500/30">
            <span className="text-blue-400 font-semibold flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.482 18.394l6.625-3.844v7.688l-6.625-3.844zm7.875-10.463L12.606 2.65l-.096.056v7.694l8.849 5.138V7.93zm-9.481 5.138l-8.85-5.138L11.48 2.65l.096.056v10.462zm-.962 1.287L2.643 8.738v7.693l6.691 3.845v-7.688z" fill="#0078D4"/>
              </svg>
              <span>Azure Data Engineer</span>
            </span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Azure Databricks <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">Module</span>
          </h1>
          <p className="text-gray-400 text-xl">Learn Azure Databricks, SQL analytics, and data engineering workflows</p>
        </div>

        {/* Azure Databricks Section */}
        {activeSection === 'azure-databricks' && (
        <section
          id="azure-databricks"
          className="bg-[#252525] rounded-xl p-8 border border-gray-600 scroll-mt-24 mb-20"
        >
          <h3 className="text-3xl font-bold text-white mb-6">5. Azure Databricks</h3>
          
          <div className="space-y-12">
            {/* Introduction to Azure Databricks */}
            <div id="introduction-to-azure-databricks" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">1. Introduction to Azure Databricks</h4>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h5 className="text-xl font-semibold text-white mb-3">What is Azure Databricks?</h5>
                  <p>
                    Azure Databricks is a cloud platform that helps people work with data and artificial intelligence in one place. It brings together tools for data engineering, data science, and machine learning, so teams can easily collect, clean, and analyze data.
                  </p>
                  <p className="mt-3">
                    It uses a <strong className="text-blue-400">"lakehouse"</strong> design, a mix of a data lake and a data warehouse, which makes it easier to store large amounts of data and use it quickly for insights or AI projects. Databricks is built on open-source tools like Apache Spark and Delta Lake, and it can run on major cloud platforms such as Azure, AWS, and Google Cloud.
                  </p>
                  <p className="mt-3">
                    Azure Databricks is a cloud-based platform that helps you work with data, analytics, and AI in one place. It combines tools for storing, processing, and analyzing data so that teams can easily build and share data projects.
                  </p>
                  <p className="mt-3">
                    It connects directly with your cloud storage and takes care of setting up and managing the required infrastructure for you.
                  </p>
                  <p className="mt-3">
                    Using Generative AI, Azure Databricks can understand your data and automatically improve performance to meet your needs. It also uses natural language processing (NLP), which means you can find data or get help just by typing questions in plain English. It can even help you write code, fix issues, and explore documentation easily.
                  </p>
                </div>
                
                <div className="mt-6">
                  <h5 className="text-xl font-semibold text-white mb-3">Key Features of Azure Databricks</h5>
                  <div className="space-y-3">
                    <div>
                      <strong className="text-blue-400">Unified Workspace:</strong> A single place where data engineers, data scientists, and analysts can work together on data and AI projects.
                    </div>
                    <div>
                      <strong className="text-blue-400">Lakehouse Architecture:</strong> Combines the best parts of data lakes and data warehouses, making it easier to store and use data efficiently.
                    </div>
                    <div>
                      <strong className="text-blue-400">Scalability:</strong> Automatically adjusts resources based on your workload, so you can handle small or large amounts of data easily.
                    </div>
                    <div>
                      <strong className="text-blue-400">Built on Apache Spark:</strong> Uses Spark, a fast and powerful open-source engine, to process large data quickly.
                    </div>
                    <div>
                      <strong className="text-blue-400">Delta Lake Integration:</strong> Ensures your data is reliable and consistent by handling updates and corrections efficiently.
                    </div>
                    <div>
                      <strong className="text-blue-400">Collaborative Notebooks:</strong> Lets teams write code, visualize data, and share work in real time using notebooks that support Python, SQL, R, and Scala.
                    </div>
                    <div>
                      <strong className="text-blue-400">Seamless Cloud Integration:</strong> Works smoothly with Azure services like Data Lake Storage, Synapse, Machine Learning, and Power BI.
                    </div>
                    <div>
                      <strong className="text-blue-400">AI and Machine Learning Support:</strong> Provides built-in tools to train, test, and deploy machine learning and AI models easily.
                    </div>
                    <div>
                      <strong className="text-blue-400">Security and Compliance:</strong> Protects your data using Azure's enterprise-grade security, including encryption, role-based access, and compliance certifications.
                    </div>
                    <div>
                      <strong className="text-blue-400">Natural Language Assistance (Generative AI):</strong> Lets users find data, write code, and fix errors just by asking questions in plain English.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Databricks Architecture */}
            <div id="databricks-architecture" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">2. Databricks Architecture</h4>
              <div className="space-y-4 text-gray-300">
                <p>
                  Azure Databricks follows a multi-layer architecture built on top of Apache Spark and Delta Lake, integrated deeply with Azure cloud services. It unifies data engineering, analytics, and AI within a single environment.
                </p>
                
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Storage Layer (Data and Delta Lake):</h5>
                  <p className="mb-3">Connects directly to cloud storage such as Azure Data Lake Storage (ADLS Gen2) or Blob Storage.</p>
                  <p className="mb-3">Delta Lake acts as the transactional storage layer, providing:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>ACID compliance</li>
                    <li>Schema enforcement and evolution</li>
                    <li>Data versioning (time travel)</li>
                    <li>Scalable metadata handling</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Compute Layer (Clusters and Runtime):</h5>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Uses Databricks Clusters G�� groups of VMs G�� for distributed data processing.</li>
                    <li>Powered by Databricks Runtime (DBR), an optimized engine based on Apache Spark.</li>
                    <li>Supports autoscaling, auto-termination, and GPU/CPU clusters for different workloads.</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Control Plane:</h5>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Managed by Databricks (in Azure).</li>
                    <li>Handles user authentication, workspace management, notebook storage, job scheduling, and cluster configuration.</li>
                    <li>Stores metadata and notebook information securely.</li>
                  </ul>
            </div>

                  <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Data Plane:</h5>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Runs inside your Azure subscription.</li>
                    <li>Responsible for actual data processing and storage.</li>
                    <li>All data remains in your cloud environment G�� ensuring compliance and security.</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Workspace / User Interface Layer:</h5>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>A collaborative web-based environment for developers, data engineers, and scientists.</li>
                    <li>Supports multiple languages G�� Python, SQL, R, Scala, Java.</li>
                    <li>Includes features like notebooks, repos, dashboards, and job orchestration.</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Machine Learning and AI Layer:</h5>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Integrates MLflow for experiment tracking, model registry, and deployment.</li>
                    <li>Supports integration with Azure Machine Learning for end-to-end MLOps.</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Security and Governance Layer:</h5>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Managed through Unity Catalog for centralized access control, data lineage, and auditing.</li>
                    <li>Uses Azure Active Directory (AAD) for authentication and RBAC for authorization.</li>
                    </ul>
                  </div>
                </div>
            </div>

            {/* Common Use Cases */}
            <div id="common-use-cases" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">3. Common Use Cases of Azure Databricks</h4>
              <div className="space-y-4 text-gray-300">
                <div className="space-y-3">
                  <div>
                    <strong className="text-blue-400">Data Engineering:</strong> Used to collect, clean, and prepare large amounts of data from different sources before analysis or reporting.
                  </div>
                  <div>
                    <strong className="text-blue-400">Data Analytics:</strong> Helps analyze and visualize data to find useful patterns and trends for better decision-making.
                  </div>
                  <div>
                    <strong className="text-blue-400">Machine Learning and AI:</strong> Allows users to train, test, and deploy machine learning and AI models directly within the platform.
                  </div>
                  <div>
                    <strong className="text-blue-400">Real-Time Data Processing:</strong> Can handle streaming data G�� for example, analyzing live sensor data or real-time transactions.
                  </div>
                  <div>
                    <strong className="text-blue-400">Data Warehousing and BI:</strong> Works with tools like Power BI to create reports and dashboards from stored data.
                  </div>
                  <div>
                    <strong className="text-blue-400">ETL (Extract, Transform, Load) Pipelines:</strong> Automates the process of moving and transforming data from one system to another for analysis.
                  </div>
                  <div>
                    <strong className="text-blue-400">Data Lakehouse Management:</strong> Combines data lake storage with data warehouse features, making it easier to manage both structured and unstructured data.
                  </div>
                  <div>
                    <strong className="text-blue-400">Collaborative Data Projects:</strong> Let's teams of data engineers and data scientists work together in shared notebooks and environments.
                  </div>
                  <div>
                    <strong className="text-blue-400">Predictive Analytics:</strong> Used to forecast trends or outcomes G�� for example, predicting customer behaviour, sales, or equipment failure.
                  </div>
                </div>
              </div>
            </div>

            {/* Core Components */}
            <div id="core-components" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">4. Core Components of Azure Databricks</h4>
              <div className="space-y-6 text-gray-300">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Workspace</h5>
                  <p>This is the main area where you and your team can create notebooks, manage data, and work together on data and AI projects.</p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Notebooks</h5>
                  <p>Interactive notebooks where you can write and run code in languages like Python, SQL, R, or Scala to explore and visualize data.</p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Clusters</h5>
                  <p>Groups of virtual machines that run your data processing tasks. They automatically scale up or down based on the workload.</p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Jobs</h5>
                  <p>Used to schedule and automate tasks like data processing, transformations, or machine learning model training.</p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Data Lake and Delta Lake</h5>
                  <p>Delta Lake stores and manages your data in a reliable way, adding features like version control, updates, and rollbacks on top of your data lake.</p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Databricks Runtime</h5>
                  <p>The engine that runs your Spark jobs G�� it's optimized for faster performance and lower costs.</p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Repos (Version Control)</h5>
                  <p>Lets you connect GitHub or Azure DevOps for source control, so you can manage and track changes to your code easily.</p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">MLflow</h5>
                  <p>A built-in tool for managing the complete machine learning lifecycle G�� from model training and tracking to deployment.</p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Unity Catalog</h5>
                  <p>A centralized data governance and access management system that helps control who can access which data across the platform.</p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Dashboarding and Visualization</h5>
                  <p>Allows you to create charts, graphs, and dashboards to share insights and monitor your data pipelines.</p>
                </div>
              </div>
            </div>

            {/* Advantages */}
            <div id="advantages" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">5. Advantages of Azure Databricks</h4>
              <div className="space-y-4 text-gray-300">
                <div className="space-y-3">
                  <div>
                    <strong className="text-blue-400">Unified Analytics and AI Platform:</strong> Combines data engineering, data science, and analytics into a single, collaborative workspace for end-to-end data workflows.
                </div>
                  <div>
                    <strong className="text-blue-400">High Performance and Scalability:</strong> Optimized Apache Spark runtime ensures faster execution, while autoscaling dynamically adjusts cluster size to handle any workload efficiently.
                  </div>
                  <div>
                    <strong className="text-blue-400">Delta Lake Reliability:</strong> Provides ACID transactions, schema enforcement, and time travel features for consistent and reliable data pipelines.
                  </div>
                  <div>
                    <strong className="text-blue-400">Deep Azure Ecosystem Integration:</strong> Natively connects with Azure Data Lake Storage, Synapse Analytics, Power BI, Azure ML, and Active Directory for seamless interoperability.
                  </div>
                  <div>
                    <strong className="text-blue-400">Multi-Language and Multi-User Collaboration:</strong> Supports Python, SQL, R, Scala, and Java within shared notebooks for cross-functional team collaboration.
                  </div>
                  <div>
                    <strong className="text-blue-400">Automated Cluster and Job Management:</strong> Simplifies operational overhead with autoscaling, auto-termination, and job scheduling capabilities.
                  </div>
                  <div>
                    <strong className="text-blue-400">Advanced Security and Governance:</strong> Offers enterprise-grade security through RBAC, encryption at rest/in transit, and governance via Unity Catalog.
                  </div>
                  <div>
                    <strong className="text-blue-400">Integrated ML and MLOps:</strong> Built-in MLflow enables experiment tracking, model versioning, and deployment supporting the full ML lifecycle.
                  </div>
                  <div>
                    <strong className="text-blue-400">Cost Optimization:</strong> Pay-as-you-go model with efficient resource utilization and intelligent scaling reduces infrastructure costs.
                  </div>
                  <div>
                    <strong className="text-blue-400">AI-Powered Assistance:</strong> Integrates generative AI and natural language capabilities for faster code generation, data discovery, and troubleshooting.
                  </div>
                </div>
              </div>
            </div>

            {/* Databricks Overview */}
            <div id="databricks-overview" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">6. Databricks Overview</h4>
              <div className="space-y-4 text-gray-300">
                <div className="space-y-4">
                  <div>
                    <strong className="text-blue-400">Go to the Azure portal and search for Databricks</strong>
                    <ImageGallery images={getImages('db_step1')} />
                  </div>
                  <div>
                    <strong className="text-blue-400">Click on create</strong>
                    <ImageGallery images={getImages('db_step2')} />
                  </div>
                  <div>
                    <strong className="text-blue-400">Create databricks</strong>
                    <ImageGallery images={getImages('db_step3')} />
                  </div>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Subscription</h5>
                  <p>Choose the Azure subscription under which the Databricks workspace will be created.</p>
                  <p className="mt-2"><strong>Example:</strong> Azure subscription 1</p>
                  <ImageGallery images={getImages('db_step4')} />
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Resource Group</h5>
                  <p>Select an existing Resource Group or create a new one.</p>
                  <p className="mt-2">Resource groups act like folders to organize and manage related resources.</p>
                  <p className="mt-2"><strong>Example:</strong> rg-ohg365-dev</p>
                  <ImageGallery images={getImages('db_step5')} />
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Workspace Name</h5>
                  <p>Enter a unique workspace name for your Databricks instance.</p>
                  <p className="mt-2"><strong>Example:</strong> ohg365-db-dev</p>
                  <ImageGallery images={getImages('db_step6')} />
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Region</h5>
                  <p>Choose the Azure region where your workspace will be hosted.</p>
                  <p className="mt-2"><strong>Example:</strong> Central US</p>
                  <ImageGallery images={getImages('db_step7')} />
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Pricing Tier</h5>
                  <p>Select the pricing tier G�� typically Premium (+ Role-based access controls) for better management and security features.</p>
                  <ImageGallery images={getImages('db_step8')} />
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Managed Resource Group Name</h5>
                  <p>Azure automatically creates a Managed Resource Group to hold internal resources required by Databricks.</p>
                  <p className="mt-2"><strong>Example:</strong> mg-ohg365-db-dev</p>
                  <ImageGallery images={getImages('db_step9')} />
                </div>

                <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Final Step G�� Review + Create</h5>
                  <p>Click Review + create to validate your settings and proceed with workspace creation.</p>
                  <p className="mt-3">While creating an Azure Databricks workspace, Azure automatically creates a separate resource group called a <strong>Managed Resource Group</strong>. This group contains and manages all the supporting resources required for the Databricks workspace, as shown in the screenshot below.</p>
                  <ImageGallery images={getImages('db_step10')} />
                </div>
              </div>
            </div>

            {/* How to Create */}
            <div id="how-to-create" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">7. How to Create Azure Databricks</h4>
              <div className="space-y-4 text-gray-300">
                <div className="space-y-4">
                  <div>
                    <strong className="text-blue-400">Go to the Azure portal and search for Databricks</strong>
                    <ImageGallery images={getImages('db_step1')} />
                  </div>
                  <div>
                    <strong className="text-blue-400">Click on create</strong>
                    <ImageGallery images={getImages('db_step2')} />
                  </div>
                  <div>
                    <strong className="text-blue-400">Create databricks</strong>
                    <ImageGallery images={getImages('db_step3')} />
                  </div>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Subscription</h5>
                  <p>Choose the Azure subscription under which the Databricks workspace will be created.</p>
                  <p className="mt-2"><strong>Example:</strong> Azure subscription 1</p>
                  <ImageGallery images={getImages('db_step4')} />
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Resource Group</h5>
                  <p>Select an existing Resource Group or create a new one.</p>
                  <p className="mt-2">Resource groups act like folders to organize and manage related resources.</p>
                  <p className="mt-2"><strong>Example:</strong> rg-ohg365-dev</p>
                  <ImageGallery images={getImages('db_step5')} />
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Workspace Name</h5>
                  <p>Enter a unique workspace name for your Databricks instance.</p>
                  <p className="mt-2"><strong>Example:</strong> ohg365-db-dev</p>
                  <ImageGallery images={getImages('db_step6')} />
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Region</h5>
                  <p>Choose the Azure region where your workspace will be hosted.</p>
                  <p className="mt-2"><strong>Example:</strong> Central US</p>
                  <ImageGallery images={getImages('db_step7')} />
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Pricing Tier</h5>
                  <p>Select the pricing tier G�� typically Premium (+ Role-based access controls) for better management and security features.</p>
                  <ImageGallery images={getImages('db_step8')} />
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Managed Resource Group Name</h5>
                  <p>Azure automatically creates a Managed Resource Group to hold internal resources required by Databricks.</p>
                  <p className="mt-2"><strong>Example:</strong> mg-ohg365-db-dev</p>
                  <ImageGallery images={getImages('db_step9')} />
                </div>

                <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Final Step G�� Review + Create</h5>
                  <p>Click Review + create to validate your settings and proceed with workspace creation.</p>
                  <p className="mt-3">While creating an Azure Databricks workspace, Azure automatically creates a separate resource group called a <strong>Managed Resource Group</strong>. This group contains and manages all the supporting resources required for the Databricks workspace, as shown in the screenshot below.</p>
                  <ImageGallery images={getImages('db_step10')} />
                </div>
              </div>
            </div>

            {/* Workspace Overview */}
            <div id="workspace-overview" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">8. Databricks Workspace Overview</h4>
              <div className="space-y-4 text-gray-300">
                <div className="space-y-3 mb-4">
                  <p><strong className="text-blue-400">Click on Databricks Workspace</strong></p>
                  <p><strong className="text-blue-400">Click on the launch workspace button</strong></p>
                </div>
                
                {/* Workspace Overview Images - image6.png, image9.png, image10.png from document */}
                <ImageGallery images={getImages('db_workspace_overview_1', 'db_workspace_overview_2', 'db_workspace_overview_3')} />
                
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Left Sidebar (Navigation Menu):</h5>
                  <p className="mb-3">The left-hand menu provides quick access to all major Databricks features and tools:</p>
                  <div className="space-y-3">
                    <div>
                      <strong className="text-blue-400">Workspace:</strong> Where you can create and organize notebooks, folders, and projects.
                    </div>
                    <div>
                      <strong className="text-blue-400">Recents:</strong> Shows recently opened notebooks or files.
                    </div>
                    <div>
                      <strong className="text-blue-400">Catalog:</strong> Central place to access and manage data using Unity Catalog. It is delta lake.
                    </div>
                    <div>
                      <strong className="text-blue-400">Jobs & Pipelines:</strong> For automating workflows, scheduling data processing, or running ETL pipelines.
                    </div>
                    <div>
                      <strong className="text-blue-400">Compute:</strong> Manage clusters and compute resources used for data processing.
                    </div>
                    <div>
                      <strong className="text-blue-400">Marketplace:</strong> Discover and use prebuilt datasets, notebooks, and solutions.
                    </div>
                    <div>
                      <strong className="text-blue-400">SQL Section:</strong>
                      <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                        <li><strong>SQL Editor:</strong> Write and run SQL queries.</li>
                        <li><strong>Queries / Dashboards:</strong> Create and view reports and dashboards.</li>
                        <li><strong>Genie & Alerts:</strong> Access AI-powered query tools and set up notifications.</li>
                        <li><strong>SQL Warehouses:</strong> Manage dedicated SQL compute environments.</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="text-blue-400">Data Engineering Section:</strong>
                      <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                        <li><strong>Job Runs / Data Ingestion:</strong> Monitor job executions and load data into Databricks.</li>
                      </ul>
                  </div>
                    <div>
                      <strong className="text-blue-400">AI/ML Section:</strong>
                      <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                        <li><strong>1. Playground (Mosaic AI Playground):</strong> Interactive environment for experimenting with generative AI models (like LLMs). You can test prompts, analyze responses, and refine model behavior G�� all in a no-code or low-code interface.</li>
                        <li><strong>2. Experiments:</strong> Track, compare, and manage machine learning runs. Integrates with MLflow Tracking.</li>
                        <li><strong>3. Features (Feature Store):</strong> Central repository for machine learning features. Allows teams to create, share, and reuse features across multiple models and projects.</li>
                        <li><strong>4. Models (Model Registry):</strong> Store, version, and manage ML models created during experiments.</li>
                        <li><strong>5. Serving (Model Serving):</strong> Deploy ML models as REST API endpoints directly from Databricks.</li>
                      </ul>
                </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Main Panel (Welcome Screen):</h5>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Displays a welcome message and a quick setup option G�� "Set up your workspace."</li>
                    <li>Provides a search bar to quickly find data, notebooks, or past work.</li>
                    <li>Contains quick links like Recents, Favorites, Popular, and Mosaic AI to navigate faster.</li>
                    <li>The "+ New" button lets you start creating a new notebook, job, or dashboard immediately.</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Top Navigation Bar:</h5>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Shows your workspace name (e.g., ohg365-db-dev).</li>
                    <li>Allows switching between workspaces or accessing your account settings.</li>
                    <li>Contains shortcuts to Microsoft Azure and Databricks home.</li>
                  </ul>
                </div>
                <ImageGallery images={getImages('image91')} />
              </div>
            </div>

            {/* Databricks Features */}
            <div id="databricks-features" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">9. Databricks Features</h4>
              <div className="space-y-8 text-gray-300">
                {/* Workspace */}
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Workspace</h5>
                  <p className="mb-4">The Workspace in Databricks is a collaborative environment where data engineers, data scientists, and analysts can create, share, and manage all Databricks-related resources such as notebooks, libraries, dashboards, and folders.</p>
                  
                  <div className="mt-4">
                    <h6 className="text-lg font-semibold text-blue-400 mb-3">Key Components in the Workspace</h6>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-600 text-sm">
                        <thead>
                          <tr className="bg-gray-700">
                            <th className="border border-gray-600 px-4 py-2 text-left">Component</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Repos</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Used for Git integration. It allows you to link your Databricks workspace to repositories in GitHub, Azure DevOps, or Bitbucket to manage version control for notebooks and projects.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Shared</strong></td>
                            <td className="border border-gray-600 px-4 py-2">A shared folder accessible to multiple team members in your workspace. It's commonly used for collaboration on notebooks, models, and scripts.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Users</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Contains individual user folders. Each user has a personal workspace where they can create and manage private notebooks and experiments.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Home / Shared with me</strong></td>
                            <td className="border border-gray-600 px-4 py-2">"Home" is your personal starting directory, while "Shared with me" lists notebooks or folders shared by other users.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Favorites / Trash</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Favorites: Quickly access important or frequently used notebooks. Trash: Contains deleted notebooks or folders which can be restored or permanently removed.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h6 className="text-lg font-semibold text-blue-400 mb-3">Other Creation Options in the Dropdown</h6>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-600 text-sm">
                        <thead>
                          <tr className="bg-gray-700">
                            <th className="border border-gray-600 px-4 py-2 text-left">Option</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Purpose</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td className="border border-gray-600 px-4 py-2">Folder</td><td className="border border-gray-600 px-4 py-2">Create a new folder to organize notebooks or scripts.</td></tr>
                          <tr><td className="border border-gray-600 px-4 py-2">Git Folder</td><td className="border border-gray-600 px-4 py-2">Connect to a Git repository for version control.</td></tr>
                          <tr><td className="border border-gray-600 px-4 py-2">Notebook</td><td className="border border-gray-600 px-4 py-2">Create a new Databricks notebook for code, visualization, or data analysis (Python, SQL, R, or Scala).</td></tr>
                          <tr><td className="border border-gray-600 px-4 py-2">File</td><td className="border border-gray-600 px-4 py-2">Upload or create a script or configuration file.</td></tr>
                          <tr><td className="border border-gray-600 px-4 py-2">Query</td><td className="border border-gray-600 px-4 py-2">Write SQL queries directly against your datasets.</td></tr>
                          <tr><td className="border border-gray-600 px-4 py-2">Dashboard</td><td className="border border-gray-600 px-4 py-2">Build visual dashboards from your queries.</td></tr>
                          <tr><td className="border border-gray-600 px-4 py-2">Genie Space</td><td className="border border-gray-600 px-4 py-2">Access AI-powered analytics assistant.</td></tr>
                          <tr><td className="border border-gray-600 px-4 py-2">ETL Pipeline</td><td className="border border-gray-600 px-4 py-2">Design and automate data pipelines.</td></tr>
                          <tr><td className="border border-gray-600 px-4 py-2">Alert</td><td className="border border-gray-600 px-4 py-2">Set up notifications for query results or data changes.</td></tr>
                          <tr><td className="border border-gray-600 px-4 py-2">MLflow Experiment</td><td className="border border-gray-600 px-4 py-2">Track machine learning experiments, metrics, and models.</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* Workspace Features - All 7 images from document */}
                  <ImageGallery images={getImages('db_workspace_1', 'db_workspace_2', 'db_workspace_3', 'db_workspace_4', 'db_workspace_5', 'db_workspace_6', 'db_workspace_7')} />
                </div>

                {/* Notebook */}
                  <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Notebook</h5>
                  <p className="mb-3">Azure Databricks notebooks serve as a collaborative development environment for building data science, engineering, and machine learning workflows.</p>
                  <p className="mb-3">They support multi-language scripting within a single document, real-time coauthoring, version control, and integrated data visualization.</p>
                  <p className="mb-3">These features help streamline code development, data exploration, and result presentation in a unified platform.</p>
                  <div className="mt-3">
                    <h6 className="text-lg font-semibold text-blue-400 mb-2">Create First Notebook:</h6>
                    <p><strong>Recents:</strong> Shows recently opened notebooks or files.</p>
                  </div>
                  {/* Notebook - All 4 images from document */}
                  <ImageGallery images={getImages('db_notebook_1', 'db_notebook_2', 'db_notebook_3', 'db_notebook_4')} />
                  </div>
                  
                {/* Catalog and Features */}
                  <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Catalog and Features (Unity Catalog)</h5>
                  <p className="mb-4">The Catalog in Azure Databricks is a central place to organize, manage, and secure all your data assets such as databases, tables, views, and files G�� across your entire Databricks environment. It provides data governance, access control, and data discovery in one interface.</p>
                  
                  <div className="mt-4">
                    <h6 className="text-lg font-semibold text-blue-400 mb-3">Key Components in the Screenshot</h6>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-600 text-sm">
                        <thead>
                          <tr className="bg-gray-700">
                            <th className="border border-gray-600 px-4 py-2 text-left">Section</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>My Organization</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Lists catalogs created within your workspace G�� for example, ohg365_db_dev, system, and others. These hold schemas (databases) and tables.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Delta Shares Received</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Displays data shared with you from other Databricks workspaces using Delta Sharing, a secure open protocol for data sharing.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Legacy (hive_metastore)</strong></td>
                            <td className="border border-gray-600 px-4 py-2">The old default data catalog (used before Unity Catalog). It contains older Hive-based tables and schemas.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Search Bar</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Lets you quickly find data assets (catalogs, schemas, tables).</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Quick Access (Right Panel)</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Displays recently viewed or favorite datasets, making it easier to return to frequently used data.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h6 className="text-lg font-semibold text-blue-400 mb-2">Top Menu Options:</h6>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>Delta Sharing:</strong> Manage secure data sharing between organizations.</li>
                      <li><strong>Clean Rooms:</strong> Enable collaboration on shared data without moving or copying it.</li>
                      <li><strong>External Data:</strong> Connect to external sources like Azure Data Lake or Blob Storage.</li>
                      <li><strong>Governance:</strong> Manage access permissions, auditing, and compliance.</li>
                      <li><strong>Add Data:</strong> Option to import or register new datasets into the catalog.</li>
                    </ul>
                  </div>
                  {/* Catalog - All 2 images from document */}
                  <ImageGallery images={getImages('db_catalog_1', 'db_catalog_2')} />
                  </div>
                  
                {/* Jobs & Pipelines */}
                  <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Jobs & Pipelines</h5>
                  <p className="mb-4">The Jobs & Pipelines interface in Azure Databricks provides a unified orchestration layer for data engineering and machine learning workflows. It supports job scheduling, dependency management, pipeline orchestration, and execution monitoring.</p>
                  
                  <div className="mt-4">
                    <h6 className="text-lg font-semibold text-blue-400 mb-3">Key Features</h6>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>Ingestion Pipelines:</strong> Automate ingestion from external data sources (databases, APIs, or files).</li>
                      <li><strong>ETL Pipelines:</strong> Design scalable, production-grade ETL processes using SQL, PySpark, or Python.</li>
                      <li><strong>Jobs:</strong> Orchestrate notebooks, workflows, pipelines, and queries; configure parameters, cluster settings, and triggers.</li>
                      <li><strong>Job Runs Dashboard:</strong> Monitor run history, logs, and metrics for troubleshooting and optimization.</li>
                      <li><strong>Access Control:</strong> Manage visibility ("Owned by me," "Accessible by me") to enforce workspace-level governance.</li>
                    </ul>
                  </div>
                  
                  <div className="mt-4">
                    <h6 className="text-lg font-semibold text-blue-400 mb-3">Use Case</h6>
                    <p>Used by data engineers and ML teams to build end-to-end pipelines from data ingestion to transformation, feature generation, and model retraining all under one environment.</p>
                  </div>

                  <div className="mt-4">
                    <h6 className="text-lg font-semibold text-blue-400 mb-3">The Job Runs Dashboard</h6>
                    <p className="mb-3">The Job Runs dashboard in Databricks provides an operational view of scheduled or triggered workflows. It allows engineers and ML teams to monitor, debug, and analyze job executions across environments.</p>
                    
                    <h6 className="text-lg font-semibold text-blue-400 mb-2">Key Functionalities</h6>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>Run Filtering:</strong> Filter runs by job, user, time range, run status, or error code.</li>
                      <li><strong>Run Visualization:</strong> Graph at the top visualizes the number of successful, failed, or skipped runs over time.</li>
                      <li><strong>Detailed Metadata:</strong> For each run, Databricks records the execution context G�� start/end time, duration, compute used, and run parameters.</li>
                      <li><strong>Error Handling:</strong> Provides error codes and logs to diagnose failure causes (e.g., cluster issues, data errors, script exceptions).</li>
                      <li><strong>Audit & Compliance:</strong> Maintains a complete audit trail for all pipeline executions G�� critical for production governance.</li>
                    </ul>

                    <h6 className="text-lg font-semibold text-blue-400 mb-2 mt-4">What You See:</h6>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>Start time</strong> G�� When the job started.</li>
                      <li><strong>Job name</strong> G�� Which job ran (for example, "ETL Pipeline").</li>
                      <li><strong>Run as</strong> G�� Which user or role ran it.</li>
                      <li><strong>Duration</strong> G�� How long it took.</li>
                      <li><strong>Status</strong> G�� Shows if it succeeded, failed, or skipped.</li>
                      <li><strong>Error code</strong> G�� Displays the error message if something failed.</li>
                      <li><strong>Run parameters</strong> G�� Lists any input values (like parameters) used in that run.</li>
                    </ul>
                  </div>
                  {/* Jobs & Pipelines - images from Azure Databricks -1.docx */}
                  <ImageGallery images={getImages('db_jobs_1', 'db1_image1', 'db1_image2')} />
                </div>

                {/* Compute (Clusters) */}
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Compute (Clusters)</h5>
                  
                  <div className="mt-4">
                    <h6 className="text-lg font-semibold text-blue-400 mb-3">Compute Categories</h6>
                    
                    <div className="mb-4">
                      <strong className="text-white">All-Purpose Compute (Interactive Clusters):</strong>
                      <ul className="list-disc list-inside space-y-1 ml-4 mt-1">
                        <li>Designed for notebook-driven, collaborative data exploration.</li>
                        <li>Supports multi-user access, auto-scaling, and auto-termination.</li>
                        <li>Ideal for data science, ad-hoc analysis, and ML development.</li>
                    </ul>
                  </div>
                  
                    <div className="mb-4">
                      <strong className="text-white">Job Compute (Automated Clusters):</strong>
                      <ul className="list-disc list-inside space-y-1 ml-4 mt-1">
                        <li>Spawned by the Jobs API or Databricks Workflows for pipeline orchestration.</li>
                        <li>Clusters are automatically created, executed, and terminated per job run.</li>
                        <li>Ideal for CI/CD, ETL, and production pipelines.</li>
                    </ul>
                  </div>

                    <div className="mb-4">
                      <strong className="text-white">SQL Warehouses (Serverless and Classic):</strong>
                      <ul className="list-disc list-inside space-y-1 ml-4 mt-1">
                        <li>Purpose-built compute for data analysts and BI tools.</li>
                        <li>Integrates with Power BI, Tableau, and Databricks SQL Dashboards.</li>
                        <li>Serverless option scales automatically and charges only for query duration.</li>
                      </ul>
                </div>

                    <div>
                      <strong className="text-white">Vector Search & Lakehouse AI (new additions):</strong>
                      <ul className="list-disc list-inside space-y-1 ml-4 mt-1">
                        <li>Supports AI/ML model deployment, feature lookups, and semantic search.</li>
                        <li>Works with Unity Catalog and Model Serving endpoints for production AI systems.</li>
                  </ul>
                </div>
              </div>
                  {/* Compute - image from document */}
                  <ImageGallery images={getImages('db_compute_1')} />
                </div>

                {/* Marketplace */}
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Marketplace</h5>
                  <p className="mb-4">Databricks Marketplace is a data and AI exchange platform that allows users to discover, share, and monetize datasets, AI models, and notebooks within the Databricks Lakehouse ecosystem G�� all powered by Delta Sharing (the open standard for secure data sharing).</p>
                  
                  <p className="mb-3">It's designed to make it easy for organizations to:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                    <li>Access third-party datasets (financial, marketing, healthcare, etc.)</li>
                    <li>Share their own data products securely</li>
                    <li>Speed up analytics and AI innovation without complex data integrations</li>
                  </ul>

                  <div className="mt-4">
                    <h6 className="text-lg font-semibold text-blue-400 mb-3">Key Components</h6>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-600 text-sm">
                        <thead>
                          <tr className="bg-gray-700">
                            <th className="border border-gray-600 px-4 py-2 text-left">Component</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Marketplace Listings</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Published datasets, ML models, or notebooks.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Providers</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Organizations offering data or AI content (e.g., FactSet, Salesforce).</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Consumers</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Databricks users or organizations that subscribe to listings.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Delta Sharing Protocol</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Enables secure, open-standard data exchange between different platforms.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Unity Catalog Integration</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Ensures governance, lineage, and access control for shared assets.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* Marketplace - image from document */}
                  <ImageGallery images={getImages('db_marketplace_1')} />
                </div>

                {/* Data Ingestion */}
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Data Ingestion</h5>
                  <p className="mb-4">Data ingestion means bringing data into Databricks from different sources G�� databases, APIs, files, or cloud storage G�� so that you can analyze or transform it later.</p>
                  <p className="mb-4">It's the first step in any data pipeline or analytics workflow.</p>
                  <p className="mb-4">The Data Ingestion tab acts as a centralized data onboarding interface. It supports:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                    <li>Direct connectors for enterprise systems</li>
                    <li>File-based uploads into Unity Catalog-managed storage</li>
                    <li>Automation tools like Fivetran and Partner Connect</li>
                    <li>Delta Lake and ADLS integrations for scalable storage</li>
                  </ul>
                  <p className="mb-4">It ensures schema consistency, metadata registration, and secure data governance under Unity Catalog.</p>
                  
                  <div className="mt-4">
                    <h6 className="text-lg font-semibold text-blue-400 mb-3">Header: GP�n+� Add data</h6>
                    <p className="mb-3"><strong>Purpose:</strong> Guides you to connect data sources, upload files, or create tables for analysis.</p>
                  </div>

                  <div className="mt-4">
                    <h6 className="text-lg font-semibold text-blue-400 mb-3">Main Sections and Options</h6>
                    
                    <div className="mb-4">
                      <h6 className="text-md font-semibold text-white mb-2">Databricks Connectors</h6>
                      <p className="mb-3">These are pre-built connectors to quickly connect to popular data platforms:</p>
                      <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-600 text-sm">
                          <thead>
                            <tr className="bg-gray-700">
                              <th className="border border-gray-600 px-4 py-2 text-left">Connector</th>
                              <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                              <th className="border border-gray-600 px-4 py-2 text-left">Typical Use Case</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-gray-600 px-4 py-2"><strong>=��� Salesforce</strong></td>
                              <td className="border border-gray-600 px-4 py-2">Connect to CRM data (leads, opportunities, accounts).</td>
                              <td className="border border-gray-600 px-4 py-2">Analyze customer and sales performance.</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-600 px-4 py-2"><strong>=��� SAP Business Data Cloud</strong></td>
                              <td className="border border-gray-600 px-4 py-2">Access enterprise resource data from SAP.</td>
                              <td className="border border-gray-600 px-4 py-2">Supply chain or financial reporting.</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-600 px-4 py-2"><strong>=��� Workday Reports</strong></td>
                              <td className="border border-gray-600 px-4 py-2">Retrieve HR, payroll, and workforce data.</td>
                              <td className="border border-gray-600 px-4 py-2">Workforce analytics and reporting.</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-600 px-4 py-2"><strong>=��� ServiceNow</strong></td>
                              <td className="border border-gray-600 px-4 py-2">Connect IT service management data.</td>
                              <td className="border border-gray-600 px-4 py-2">Incident and change management insights.</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-600 px-4 py-2"><strong>=��� Google Analytics Raw Data</strong></td>
                              <td className="border border-gray-600 px-4 py-2">Import website and marketing analytics data.</td>
                              <td className="border border-gray-600 px-4 py-2">Digital marketing and campaign performance.</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-600 px-4 py-2"><strong>=��� SQL Server</strong></td>
                              <td className="border border-gray-600 px-4 py-2">Connect on-prem or cloud-hosted SQL databases.</td>
                              <td className="border border-gray-600 px-4 py-2">Bring structured transactional data into Databricks.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h6 className="text-md font-semibold text-white mb-2">Files Section</h6>
                      <p className="mb-3">For manual uploads or storage-based ingestion.</p>
                      <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-600 text-sm">
                          <thead>
                            <tr className="bg-gray-700">
                              <th className="border border-gray-600 px-4 py-2 text-left">Option</th>
                              <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                              <th className="border border-gray-600 px-4 py-2 text-left">When to Use</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-gray-600 px-4 py-2"><strong>=��� Create or modify table</strong></td>
                              <td className="border border-gray-600 px-4 py-2">Upload files like CSV, JSON, or Parquet to create or replace tables.</td>
                              <td className="border border-gray-600 px-4 py-2">Ideal for one-time imports or small datasets.</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-600 px-4 py-2"><strong>=��� Upload files to a volume</strong></td>
                              <td className="border border-gray-600 px-4 py-2">Upload non-tabular files (images, logs, etc.) managed under Unity Catalog Volumes.</td>
                              <td className="border border-gray-600 px-4 py-2">For non-structured data like logs, models, or raw files.</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-600 px-4 py-2"><strong>G��n+� Create table from Azure Data Lake Storage (ADLS)</strong></td>
                              <td className="border border-gray-600 px-4 py-2">Load data directly from Azure Data Lake into a Delta table.</td>
                              <td className="border border-gray-600 px-4 py-2">For large-scale, enterprise-grade data pipelines.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h6 className="text-md font-semibold text-white mb-2">Fivetran Connectors (via Partner Connect)</h6>
                      <p className="mb-2">At the bottom, you'll find:</p>
                      <p className="mb-2">"See all available ingest partners in Partner Connect."</p>
                      <p className="mb-2">Partner Connect lets you integrate tools like:</p>
                      <p>Fivetran, Informatica, Qlik, etc. to automate ingestion from hundreds of data sources into Databricks.</p>
                    </div>
                  </div>

                  {/* Data Ingestion - images from Azure Databricks -1.docx */}
                  <ImageGallery images={getImages('db1_image3', 'db1_image4', 'db1_image5')} />
                </div>
              </div>
            </div>
          </div>
        </section>
        )}

        {/* Databricks SQL Section */}
        {activeSection === 'databricks-sql' && (
        <section
          id="databricks-sql"
          className="bg-[#252525] rounded-xl p-8 border border-gray-600 scroll-mt-24 mb-20"
        >
          <h3 className="text-3xl font-bold text-white mb-6">6. Databricks SQL</h3>
          
          <div className="space-y-12">
            <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700">
              <h4 className="text-2xl font-semibold text-white mb-4">Introduction to Databricks SQL</h4>
              <div className="space-y-4 text-gray-300">
                <p>
                  <strong className="text-blue-400">Databricks SQL</strong> is a serverless SQL analytics service that allows you to run SQL queries on your data lake without managing infrastructure. It provides a data warehouse-like experience on top of your data lake, enabling fast and efficient SQL-based analytics.
                </p>
                <p>
                  Databricks SQL integrates seamlessly with your existing Databricks workspace and provides tools for data analysts and business users to work with data using familiar SQL syntax and BI tools.
                </p>
                <ImageGallery images={getImages('image63')} />
              </div>
            </div>

            {/* SQL Editor */}
            <div id="sql-editor" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">1. SQL Editor</h4>
              <div className="space-y-4 text-gray-300">
                <p>
                  The <strong className="text-blue-400">SQL Editor</strong> in Databricks allows users to write, run, and visualize SQL queries directly on data stored in Unity Catalog, Delta tables, or external databases G�� all without needing to create a separate notebook.
                </p>
                <p>
                  It's designed for:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Data Analysts</li>
                  <li>BI Developers</li>
                  <li>Data Engineers</li>
                  <li>Business users who prefer SQL-based analytics</li>
                </ul>
                <p className="mt-3">
                  Think of the SQL Editor as a notepad for data inside Databricks G�� where you can write and run SQL commands (like SELECT, JOIN, GROUP BY, etc.) on your company's data tables. It's like working in SQL Server Management Studio (SSMS) or MySQL Workbench G�� but directly connected to your Databricks Lakehouse.
                </p>
                
                <div className="p-4 bg-gray-800 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Key Options</h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-600 text-sm">
                      <thead>
                        <tr className="bg-gray-700">
                          <th className="border border-gray-600 px-4 py-2 text-left">Option</th>
                          <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>Run all (1000)</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Executes your SQL query. The "1000" indicates the max number of rows returned.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>Database Selector (default)</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Lets you choose which catalog, schema, or database to query from.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>Generate (AI)</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Databricks Assistant can auto-generate SQL queries using AI (Ctrl + I).</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>Connect</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Allows you to choose which SQL warehouse (compute cluster) to run the query on.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>Schedule</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Lets you set up automated query runs (for reports or alerts).</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>Share</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Share your query or results with other Databricks users.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>Save</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Save your query as a draft, dashboard widget, or SQL alert.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>Add Parameter</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Add variables like dates or IDs dynamically to queries.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Advanced SQL Editor Features</h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-600 text-sm">
                      <thead>
                        <tr className="bg-gray-700">
                          <th className="border border-gray-600 px-4 py-2 text-left">Feature</th>
                          <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>AI Assistant (Generate)</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Use AI (Ctrl + I) to create SQL automatically from a prompt (e.g., "show top 10 products by revenue").</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>Visual Output</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Query results can be visualized as tables, bar charts, line graphs, etc.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>Saved Queries</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Queries can be stored and reused from the "Queries" tab.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>Query Parameters</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Dynamic filters can be used for dashboards and alerts.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>Scheduling & Alerts</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Run queries hourly/daily and send alerts when thresholds are reached.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>Integration with SQL Warehouses</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Choose a compute cluster optimized for BI workloads.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>Export Options</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Export results as CSV or share within a dashboard.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Professional Use Cases</h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-600 text-sm">
                      <thead>
                        <tr className="bg-gray-700">
                          <th className="border border-gray-600 px-4 py-2 text-left">Role</th>
                          <th className="border border-gray-600 px-4 py-2 text-left">Example Use Case</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2">Data Analyst</td>
                          <td className="border border-gray-600 px-4 py-2">Ad-hoc query and visualization for business reports</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2">Data Engineer</td>
                          <td className="border border-gray-600 px-4 py-2">Validate Delta table transformations</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2">BI Developer</td>
                          <td className="border border-gray-600 px-4 py-2">Build dashboards directly from SQL Editor</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2">Data Scientist</td>
                          <td className="border border-gray-600 px-4 py-2">Fetch clean subsets of data for ML notebooks</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2">Manager / Stakeholder</td>
                          <td className="border border-gray-600 px-4 py-2">View high-level KPIs in SQL dashboards</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* SQL Editor - All 2 images from document */}
                <ImageGallery images={getImages('db_sql_editor_1', 'db_sql_editor_2')} />
              </div>
            </div>

            {/* Queries */}
            <div id="queries" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">2. Queries</h4>
              <div className="space-y-4 text-gray-300">
                <p>
                  The Queries interface lets you develop and manage SQL statements that interact directly with data in Databricks SQL Warehouses. You can track query execution history, collaborate with team members, tag queries for organization, and use scheduling for automated reporting.
                </p>
                
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Available Options in the Queries Section</h5>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Create Query</strong> G�� Opens a new SQL editor window where you can start writing SQL statements.</li>
                    <li><strong>Open Editor</strong> G�� Quickly navigate back to the SQL editor to modify existing queries.</li>
                    <li><strong>Filter Queries</strong> G�� Search for queries by name or tag.</li>
                    <li><strong>Tabs:</strong>
                      <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                        <li><strong>My Queries</strong> G�� Shows only your saved queries.</li>
                        <li><strong>Favorites</strong> G�� Displays queries you've marked as important.</li>
                        <li><strong>All Queries</strong> G�� Lists all available queries within the workspace.</li>
                      </ul>
                    </li>
                    <li><strong>Created By / Created At</strong> G�� Helps you identify who created the query and when.</li>
                    <li><strong>Query History</strong> G�� Access past runs, view execution times, and troubleshoot failed queries.</li>
                    <li><strong>Dashboards Integration</strong> G�� Save query results and directly add them to dashboards for visualization.</li>
                  </ul>
                </div>
                {/* Queries - image from document */}
                <ImageGallery images={getImages('db_queries_1')} />
              </div>
            </div>

            {/* Dashboards */}
            <div id="dashboards" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">3. Dashboards</h4>
              <div className="space-y-4 text-gray-300">
                <p>
                  Databricks Dashboards provide a powerful visualization layer built directly on top of Databricks SQL. They support real-time data refresh, query scheduling, and access control for collaboration.
                </p>
                <p>
                  You can embed dashboards in other apps or share them securely within your workspace. It's great for operational monitoring, BI reporting, and executive summaries.
                </p>
                
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Options and Features in the Dashboard Section</h5>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Create Dashboard</strong> G�� Start building your own dashboard from scratch using your saved queries or visualizations.</li>
                    <li><strong>View Samples Gallery</strong> G�� Explore prebuilt sample dashboards such as NYC Taxi Trip Analysis and Retail Revenue & Supply Chain to understand layout and visualization options.</li>
                    <li><strong>Filter Dashboards</strong> G�� Quickly search for dashboards by name or owner.</li>
                    <li><strong>Tabs:</strong>
                      <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                        <li><strong>All</strong> G�� Displays every dashboard you have access to.</li>
                        <li><strong>Favorites</strong> G�� Your bookmarked dashboards.</li>
                        <li><strong>Popular</strong> G�� Dashboards frequently viewed by others.</li>
                      </ul>
                    </li>
                    <li><strong>Last Modified / Owner Filters</strong> G�� Sort and manage dashboards based on activity or ownership.</li>
                    <li><strong>Legacy Dashboards</strong> G�� View or migrate older dashboards built using the classic interface.</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Visualization Types Supported:</h5>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Bar, Line, Area, and Pie charts</li>
                    <li>Scatter plots and maps</li>
                    <li>Summary tables and KPI cards</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Integration:</h5>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Link dashboards directly to Queries or Notebooks</li>
                    <li>Automate data refresh schedules</li>
                    <li>Share via workspace or URL</li>
                  </ul>
                </div>

                <div className="p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Legacy Dashboards</h5>
                  <p className="mb-3">Legacy Dashboards in Databricks are maintained mainly for backward compatibility. They support dashboards created with the classic Databricks SQL editor.</p>
                  <p className="mb-3">While functional, they lack newer visualization features, layout flexibility, and integration capabilities present in the modern dashboards.</p>
                  <p className="mb-3">It's recommended to migrate older dashboards to the new dashboarding experience for improved performance, interactivity, and long-term support.</p>
                  
                  <h6 className="text-lg font-semibold text-blue-400 mb-2 mt-3">Key Options and Features (Legacy Dashboards Section)</h6>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>Tabs and Filters:</strong> My Dashboards, Favorites, All Dashboards, Filter Dashboards</li>
                    <li><strong>Actions Available:</strong> View Samples Gallery, Create Dashboard</li>
                    <li><strong>Legacy Dashboard Use Cases:</strong> Maintaining compatibility with older workflows, Referencing historical SQL visualizations, Supporting BI users during migration to new dashboards</li>
                  </ul>
                </div>
                {/* Dashboards - All 2 images from document */}
                <ImageGallery images={getImages('db_dashboards_1', 'db_dashboards_2')} />
              </div>
            </div>

            {/* Genie */}
            <div id="genie" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">4. Genie</h4>
              <div className="space-y-4 text-gray-300">
                <p>
                  <strong className="text-blue-400">Databricks Genie</strong> is a Generative AI-powered assistant built into the Databricks SQL workspace. It allows users to ask questions about data using natural language (like English sentences) G�� and Genie automatically generates SQL queries, runs them, and visualizes the results.
                </p>
                <p>
                  Genie uses natural language understanding (NLU) to parse questions and generate optimized SQL queries based on data catalog metadata. It can work across Unity Catalog, SQL Warehouses, and Delta Tables.
                </p>
                <p>
                  Ideal for:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Data analysts exploring ad hoc questions</li>
                  <li>Business users performing self-service analytics</li>
                  <li>Teams collaborating in Genie "Spaces" to share question-answer results</li>
                </ul>
                
                <div className="p-4 bg-gray-800 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Key Options in the Genie Interface</h5>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Filter spaces</strong> G�� Search for an existing "Genie Space." A space is like a shared workspace for Genie conversations.</li>
                    <li><strong>Tabs:</strong>
                      <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                        <li><strong>All</strong> G�� View all Genie spaces accessible to you.</li>
                        <li><strong>Favorites</strong> G�� Quickly access frequently used spaces.</li>
                        <li><strong>Popular</strong> G�� See trending Genie spaces used by your team.</li>
                      </ul>
                    </li>
                    <li><strong>Last Modified</strong> G�� Sort by recent updates.</li>
                    <li><strong>Owner</strong> G�� Filter by creator or data owner.</li>
                    <li><strong>New</strong> G�� Create a new Genie space to start a natural language query session. Add datasets or tables. Ask AI questions about those datasets. Save and share results or charts.</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Genie Spaces</h5>
                  <p className="mb-2">A Genie Space is a shared area where you can:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Add datasets or views</li>
                    <li>Ask natural language questions</li>
                    <li>Save queries and visualizations</li>
                    <li>Collaborate with team members</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Advantages of Databricks Genie</h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-600 text-sm">
                      <thead>
                        <tr className="bg-gray-700">
                          <th className="border border-gray-600 px-4 py-2 text-left">Feature</th>
                          <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>=��� AI-driven</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Converts natural language to accurate SQL</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>G�� Fast Insights</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Quick data exploration without manual queries</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>=��� Visualization</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Auto-generates charts and dashboards</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>=��� Secure</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Works with Unity Catalog permissions</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>=��� Collaborative</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Supports multi-user spaces and shared queries</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>=��� Integrated</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Works with SQL Warehouses and Delta tables</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Alerts */}
            <div id="alerts" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">5. Alerts</h4>
              <div className="space-y-4 text-gray-300">
                <p>
                  Alerts in Azure Databricks help you automatically monitor data conditions or metrics in your SQL queries and get notified when something important changes. They make it easy to track trends, catch issues early, and stay updated without checking dashboards manually.
                </p>
                <p>
                  Alerts can be connected to SQL queries, dashboards, or KPIs across Unity Catalog datasets.
                </p>
                <p>You can:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Automate anomaly detection for production data.</li>
                  <li>Trigger alerts for pipeline monitoring, threshold breaches, or data quality checks.</li>
                  <li>Integrate alerts into workflow tools like Azure Monitor or Slack using webhooks.</li>
                </ul>
                
                <div className="p-4 bg-gray-800 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Advanced configurations let you:</h5>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Adjust the schedule frequency.</li>
                    <li>Add multiple recipients.</li>
                    <li>Manage alerts programmatically via the Databricks REST API.</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Key Elements in the Alerts UI</h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-600 text-sm">
                      <thead>
                        <tr className="bg-gray-700">
                          <th className="border border-gray-600 px-4 py-2 text-left">Element</th>
                          <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>=��� Filter alerts</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Search existing alerts by name or keyword.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>=��� My alerts / All alerts</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Switch between alerts you created and those shared by your team.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>=��+ List section</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Displays alert name, status, last updated time, creator, and creation date.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>GP� Create alert</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Start setting up a new data alert (SQL query-based).</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>GŬ Previous / Next</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Navigate between pages if you have multiple alerts.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Benefits of Using Databricks Alerts</h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-600 text-sm">
                      <thead>
                        <tr className="bg-gray-700">
                          <th className="border border-gray-600 px-4 py-2 text-left">Feature</th>
                          <th className="border border-gray-600 px-4 py-2 text-left">Benefit</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>G�� Automated Monitoring</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Tracks metrics and thresholds continuously</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>=��� Notifications</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Sends alerts via email or webhooks</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>=��� Collaboration</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Share alerts across teams or workspaces</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>=��� Secure</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Follows Unity Catalog access controls</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>=��� Integrated</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Works with queries, dashboards, and pipelines</td>
                        </tr>
                      </tbody>
                    </table>
                </div>
                </div>
                {/* Alerts - image from document */}
                <ImageGallery images={getImages('db_alerts_1')} />
              </div>
            </div>

            {/* Query History */}
            <div id="query-history" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">6. Query History</h4>
              <div className="space-y-4 text-gray-300">
                <p>
                  The Query History page in Databricks provides a complete log of all SQL queries executed in your workspace. It helps users monitor performance, debug issues, track usage, and ensure compliance G�� all in one place.
                </p>
                <p>
                  The Query History view is essential for monitoring performance, auditing, and optimizing workloads:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>You can track resource utilization across multiple SQL warehouses.</li>
                  <li>It's useful for troubleshooting slow-running queries.</li>
                  <li>The Source column identifies where the query originated: SQL Editor, Dashboard, Alert, API or Notebook.</li>
                  <li>You can also export query metrics via REST API for deeper analytics.</li>
                  <li>Integration with Unity Catalog ensures secure tracking of all user-level activity across workspaces.</li>
                  </ul>
                
                <div className="p-4 bg-gray-800 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Key Options and Columns</h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-600 text-sm">
                      <thead>
                        <tr className="bg-gray-700">
                          <th className="border border-gray-600 px-4 py-2 text-left">Element</th>
                          <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>=��� User</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Shows who ran the query (e.g., your email ID). Helps identify the query owner.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>=��� Date Range (Last 7 days)</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Filters query history by time period (e.g., last day, week, month, or custom range).</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>G��n+� Compute</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Filters queries based on the SQL Warehouse or cluster used.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>GŦn+� Duration</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Lets you filter by how long queries took to run.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>=��� Status</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Shows whether a query succeeded, failed, or was canceled.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>=��� Statement / Statement ID</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Displays SQL text and a unique identifier for each run. Useful for debugging or tracking jobs.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>=��� Refresh / Reset filters</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Reloads or clears filters to show all results again.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>=��� Columns in the table</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Includes Query, Started at, Duration, Source, Compute, User G�� all helping in tracking query performance.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Common Use Cases</h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-600 text-sm">
                      <thead>
                        <tr className="bg-gray-700">
                          <th className="border border-gray-600 px-4 py-2 text-left">Use Case</th>
                          <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>=��+ Audit Log</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Track which users are querying what data for compliance or governance.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>=��� Performance Analysis</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Identify long-running queries and optimize them.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>G�� Troubleshooting</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Debug query failures using statement IDs.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>=���G��G��n+� Collaboration</strong></td>
                          <td className="border border-gray-600 px-4 py-2">See who ran what and when for shared datasets.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>=��� Alert Review</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Review the queries triggered by scheduled alerts or dashboards.</td>
                        </tr>
                      </tbody>
                    </table>
                </div>
                </div>
                {/* Query History - image from document */}
                <ImageGallery images={getImages('db_query_history_1')} />
              </div>
            </div>

            {/* SQL Data Warehouse */}
            <div id="sql-data-warehouse" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">7. SQL Data Warehouse</h4>
              <div className="space-y-4 text-gray-300">
                <p>
                  A SQL Warehouse (formerly called SQL Endpoint) is the compute resource in Databricks used to run SQL queries, dashboards, and alerts. It is designed for data analysts, BI developers, and engineers who work with SQL-based data processing G�� similar to how a cluster runs notebooks, but optimized for SQL workloads.
                </p>
                
                <div className="p-4 bg-gray-800 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Key Components (from Screenshot)</h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-600 text-sm">
                      <thead>
                        <tr className="bg-gray-700">
                          <th className="border border-gray-600 px-4 py-2 text-left">Section</th>
                          <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>=��� Compute Tab</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Displays different compute options: All-purpose compute, Job compute, SQL warehouses, etc.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>=��� SQL Warehouses Tab</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Dedicated area to view, start, stop, and manage all SQL Warehouses.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>=��� Filter SQL warehouses</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Search and filter warehouses by name.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>=��� Only my SQL warehouses</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Show only the warehouses created by you.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>=��� Created by / Size / Status / Type</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Shows details about the warehouse (who made it, its size, whether it's active, and its type).</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>=��� Create SQL warehouse button</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Used to create a new warehouse. Disabled if permissions are limited.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Warehouse Properties (Visible Example)</h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-600 text-sm">
                      <thead>
                        <tr className="bg-gray-700">
                          <th className="border border-gray-600 px-4 py-2 text-left">Property</th>
                          <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>=��+n+� Name</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Serverless Starter Warehouse G�� this is a default pre-configured warehouse.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>=��� Created by</strong></td>
                          <td className="border border-gray-600 px-4 py-2">The user who created it (e.g., manoj vemula).</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>G��n+� Size</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Defines compute power (Small, Medium, Large, etc.). Determines speed and cost.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>=��� Active / Max</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Shows how many users or queries are currently running on the warehouse.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>G��n+� Type</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Serverless G�� means Databricks automatically manages compute resources.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Types of SQL Warehouses</h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-600 text-sm">
                    <thead>
                      <tr className="bg-gray-700">
                          <th className="border border-gray-600 px-4 py-2 text-left">Type</th>
                        <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                          <th className="border border-gray-600 px-4 py-2 text-left">Use Case</th>
                      </tr>
                    </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>=��� Serverless SQL Warehouse</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Fully managed by Databricks. Scales automatically and starts instantly.</td>
                          <td className="border border-gray-600 px-4 py-2">Great for quick analysis and dashboards.</td>
                      </tr>
                      <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>G��n+� Classic (Pro) SQL Warehouse</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Requires manual scaling and management. You control cluster size and scaling.</td>
                          <td className="border border-gray-600 px-4 py-2">Used for enterprise workloads needing more control and predictable cost.</td>
                      </tr>
                    </tbody>
                  </table>
                  </div>
                </div>

                <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">When You Click "Create SQL Warehouse"</h5>
                  <p className="mb-3">You can define:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>Name</strong> of warehouse</li>
                    <li><strong>Cluster size</strong> (e.g., Small, Medium, 2X-Large)</li>
                    <li><strong>Auto-stop</strong> timeout to save costs</li>
                    <li><strong>Max concurrency</strong> (how many queries run at once)</li>
                    <li><strong>Permissions</strong> (who can access or run queries)</li>
                    <li><strong>Channel</strong> (stable, preview, etc.)</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">=��� Technical Features</h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-600 text-sm">
                      <thead>
                        <tr className="bg-gray-700">
                          <th className="border border-gray-600 px-4 py-2 text-left">Feature</th>
                          <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>=��� Elastic scaling</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Automatically adjusts resources to handle varying workloads.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>=�Ʀ Pay-per-use</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Charged per DBU (Databricks Unit) based on compute time.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>=��� Optimized for BI Tools</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Integrates with Power BI, Tableau, and Looker for live queries.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>=��� Serverless Architecture</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Starts instantly; no need to wait for cluster startup.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>=��� Unity Catalog Integration</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Enforces data access control and audit policies.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* SQL Warehouse - image from document */}
                <ImageGallery images={getImages('db_sql_warehouse_1')} />
              </div>
            </div>
          </div>
        </section>
        )}

        {/* Data Engineering Section */}
        {activeSection === 'azure-databricks-1' && (
        <section id="azure-databricks-1" className="space-y-8 scroll-mt-24">
          <div className="space-y-8">
            {/* Data Engineering - Main Heading */}
            <div id="data-engineering" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h3 className="text-3xl font-bold text-white mb-6">Data Engineering</h3>
              
              {/* Jobs run's - 1st subheading */}
              <div id="jobs-runs" className="mb-8">
                <h4 className="text-2xl font-semibold text-white mb-4">Jobs run's</h4>
                <div className="space-y-4 text-gray-300">
                  <p>
                    The Jobs & Pipelines interface in Azure Databricks provides a unified orchestration layer for data engineering and machine learning workflows. It supports job scheduling, dependency management, pipeline orchestration, and execution monitoring.
                  </p>
                  
                  <div className="p-4 bg-gray-800 rounded-lg mt-4">
                    <h5 className="text-xl font-semibold text-white mb-3">Key Features</h5>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>Ingestion Pipelines:</strong> Automate ingestion from external data sources (databases, APIs, or files).</li>
                      <li><strong>ETL Pipelines:</strong> Design scalable, production-grade ETL processes using SQL, PySpark, or Python.</li>
                      <li><strong>Jobs:</strong> Orchestrate notebooks, workflows, pipelines, and queries; configure parameters, cluster settings, and triggers.</li>
                      <li><strong>Job Runs Dashboard:</strong> Monitor run history, logs, and metrics for troubleshooting and optimization.</li>
                      <li><strong>Access Control:</strong> Manage visibility ("Owned by me," "Accessible by me") to enforce workspace-level governance.</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg mt-4">
                    <h5 className="text-xl font-semibold text-white mb-3">Use Case</h5>
                    <p>Used by data engineers and ML teams to build end-to-end pipelines G�� from data ingestion to transformation, feature generation, and model retraining G�� all under one environment.</p>
                  </div>

                  <p>
                    The Job Runs dashboard in Databricks provides an operational view of scheduled or triggered workflows. It allows engineers and ML teams to monitor, debug, and analyze job executions across environments.
                  </p>

                  <div className="p-4 bg-gray-800 rounded-lg mt-4">
                    <h5 className="text-xl font-semibold text-white mb-3">Key Functionalities</h5>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>Run Filtering:</strong> Filter runs by job, user, time range, run status, or error code.</li>
                      <li><strong>Run Visualization:</strong> Graph at the top visualizes the number of successful, failed, or skipped runs over time.</li>
                      <li><strong>Detailed Metadata:</strong> For each run, Databricks records the execution context G�� start/end time, duration, compute used, and run parameters.</li>
                      <li><strong>Error Handling:</strong> Provides error codes and logs to diagnose failure causes (e.g., cluster issues, data errors, script exceptions).</li>
                      <li><strong>Audit & Compliance:</strong> Maintains a complete audit trail for all pipeline executions G�� critical for production governance.</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-gray-800 rounded-lg mt-4">
                    <h5 className="text-xl font-semibold text-white mb-3">What You See:</h5>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-600 text-sm">
                        <thead>
                          <tr className="bg-gray-700">
                            <th className="border border-gray-600 px-4 py-2 text-left">Field</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Start time</strong></td>
                            <td className="border border-gray-600 px-4 py-2">When the job started.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Job name</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Which job ran (for example, "ETL Pipeline").</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Run as</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Which user or role ran it.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Duration</strong></td>
                            <td className="border border-gray-600 px-4 py-2">How long it took.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Status</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Shows if it succeeded, failed, or skipped.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Error code</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Displays the error message if something failed.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Run parameters</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Lists any input values (like parameters) used in that run.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* Jobs & Pipelines images */}
                <ImageGallery images={getImages('db1_image1', 'db1_image2')} />
              </div>

              {/* Data Ingestion - 2nd subheading */}
              <div id="data-ingestion" className="mb-8">
                <h4 className="text-2xl font-semibold text-white mb-4">Data Ingestion</h4>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Data ingestion means bringing data into Databricks from different sources G�� databases, APIs, files, or cloud storage G�� so that you can analyze or transform it later.
                  </p>
                  <p>
                    It's the first step in any data pipeline or analytics workflow.
                  </p>
                  <p>
                    The Data Ingestion tab acts as a centralized data onboarding interface. It supports:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Direct connectors for enterprise systems</li>
                    <li>File-based uploads into Unity Catalog-managed storage</li>
                    <li>Automation tools like Fivetran and Partner Connect</li>
                    <li>Delta Lake and ADLS integrations for scalable storage</li>
                  </ul>
                  <p>
                    It ensures schema consistency, metadata registration, and secure data governance under Unity Catalog.
                  </p>

                  <div className="p-4 bg-gray-800 rounded-lg mt-4">
                    <h5 className="text-xl font-semibold text-white mb-3">Header: GP�n+� Add data</h5>
                    <p><strong>Purpose:</strong> Guides you to connect data sources, upload files, or create tables for analysis.</p>
                  </div>

                  <div className="p-4 bg-gray-800 rounded-lg mt-4">
                    <h5 className="text-xl font-semibold text-white mb-3">Main Sections and Options</h5>
                    
                    <h6 className="text-lg font-semibold text-blue-400 mb-2 mt-3">Databricks Connectors</h6>
                    <p className="mb-3">These are pre-built connectors to quickly connect to popular data platforms:</p>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-600 text-sm">
                        <thead>
                          <tr className="bg-gray-700">
                            <th className="border border-gray-600 px-4 py-2 text-left">Connector</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Typical Use Case</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">=��� Salesforce</td>
                            <td className="border border-gray-600 px-4 py-2">Connect to CRM data (leads, opportunities, accounts).</td>
                            <td className="border border-gray-600 px-4 py-2">Analyze customer and sales performance.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">=��� SAP Business Data Cloud</td>
                            <td className="border border-gray-600 px-4 py-2">Access enterprise resource data from SAP.</td>
                            <td className="border border-gray-600 px-4 py-2">Supply chain or financial reporting.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">=��� Workday Reports</td>
                            <td className="border border-gray-600 px-4 py-2">Retrieve HR, payroll, and workforce data.</td>
                            <td className="border border-gray-600 px-4 py-2">Workforce analytics and reporting.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">=��� ServiceNow</td>
                            <td className="border border-gray-600 px-4 py-2">Connect IT service management data.</td>
                            <td className="border border-gray-600 px-4 py-2">Incident and change management insights.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">=��� Google Analytics Raw Data</td>
                            <td className="border border-gray-600 px-4 py-2">Import website and marketing analytics data.</td>
                            <td className="border border-gray-600 px-4 py-2">Digital marketing and campaign performance.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">=��� SQL Server</td>
                            <td className="border border-gray-600 px-4 py-2">Connect on-prem or cloud-hosted SQL databases.</td>
                            <td className="border border-gray-600 px-4 py-2">Bring structured transactional data into Databricks.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <h6 className="text-lg font-semibold text-blue-400 mb-2 mt-4">Files Section</h6>
                    <p className="mb-3">For manual uploads or storage-based ingestion.</p>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-600 text-sm">
                        <thead>
                          <tr className="bg-gray-700">
                            <th className="border border-gray-600 px-4 py-2 text-left">Option</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">When to Use</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">=��� Create or modify table</td>
                            <td className="border border-gray-600 px-4 py-2">Upload files like CSV, JSON, or Parquet to create or replace tables.</td>
                            <td className="border border-gray-600 px-4 py-2">Ideal for one-time imports or small datasets.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">=��� Upload files to a volume</td>
                            <td className="border border-gray-600 px-4 py-2">Upload non-tabular files (images, logs, etc.) managed under Unity Catalog Volumes.</td>
                            <td className="border border-gray-600 px-4 py-2">For non-structured data like logs, models, or raw files.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">G��n+� Create table from Azure Data Lake Storage (ADLS)</td>
                            <td className="border border-gray-600 px-4 py-2">Load data directly from Azure Data Lake into a Delta table.</td>
                            <td className="border border-gray-600 px-4 py-2">For large-scale, enterprise-grade data pipelines.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <h6 className="text-lg font-semibold text-blue-400 mb-2 mt-4">Fivetran Connectors (via Partner Connect)</h6>
                    <p className="mb-2">At the bottom, you'll find:</p>
                    <p className="mb-2">"See all available ingest partners in Partner Connect."</p>
                    <p>Partner Connect lets you integrate tools like Fivetran, Informatica, Qlik, etc. to automate ingestion from hundreds of data sources into Databricks.</p>
                  </div>
                </div>
                {/* Data Ingestion images */}
                <ImageGallery images={getImages('db1_image3', 'db1_image4', 'db1_image5')} />
              </div>
            </div>

            {/* AI/ML - Main Heading */}
            <div id="ai-ml" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h3 className="text-3xl font-bold text-white mb-6">AI/ML</h3>
              
              {/* Playground - 1st subheading */}
              <div id="playground" className="mb-8">
                <h4 className="text-2xl font-semibold text-white mb-4">Playground</h4>
                <div className="space-y-4 text-gray-300">
                  <p>
                    The Playground in Databricks is an interactive environment where you can experiment with AI models, build and test prompts, and prototype intelligent agents before deploying them into production.
                  </p>
                  <p>
                    It's like a sandbox for Generative AI within your Databricks workspace.
                  </p>
                  
                  <div className="p-4 bg-gray-800 rounded-lg mt-4">
                    <h5 className="text-xl font-semibold text-white mb-3">Key Capabilities</h5>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Chat with or test AI models (like GPT, MPT, or Llama).</li>
                      <li>Ask questions, summarize documents, or generate code.</li>
                      <li>Try out small AI tasks (like question answering or summarization) before building real applications.</li>
                      <li>A low-code interface for LLM prompt engineering and evaluation.</li>
                      <li>Integration with Unity Catalog tools for secure, governed model use.</li>
                      <li>The ability to prototype AI agents with custom tools, such as function calling, retrieval-augmented generation (RAG), and data-aware AI.</li>
                      <li>Seamless connection to Databricks' MLflow, Feature Store, and Model Serving for deployment.</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-gray-800 rounded-lg mt-4">
                    <h5 className="text-xl font-semibold text-white mb-3">Main Components on the Page</h5>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-600 text-sm">
                        <thead>
                          <tr className="bg-gray-700">
                            <th className="border border-gray-600 px-4 py-2 text-left">Section</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Purpose</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Model Selector (Top Bar)</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Shows the current model (e.g., GPT OSS 120B). You can switch between models here.</td>
                            <td className="border border-gray-600 px-4 py-2">Choose which AI model to test or fine-tune.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Tools Menu</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Access to tools or APIs integrated with the model (like function calling, RAG, or evaluation tools).</td>
                            <td className="border border-gray-600 px-4 py-2">Extend the model's capabilities using custom or pre-built tools.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Prototype an Agent</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Lets you add your own tool and connect it to a model to create AI agents.</td>
                            <td className="border border-gray-600 px-4 py-2">Build task-oriented AI agents (e.g., summarizer, SQL generator, chatbot).</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Start with an Example</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Offers quick test templates: Function Calling, Summarization, Document Q&A.</td>
                            <td className="border border-gray-600 px-4 py-2">Try example scenarios to understand model behavior.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Evaluation Section</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Helps evaluate model responses.</td>
                            <td className="border border-gray-600 px-4 py-2">Assess accuracy, relevance, and quality of model outputs.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Prompt Input Area</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Text box at the bottom ("Start typing...").</td>
                            <td className="border border-gray-600 px-4 py-2">Enter prompts, run queries, and see model responses interactively.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-800 rounded-lg mt-4">
                    <h5 className="text-xl font-semibold text-white mb-3">For AI Developers</h5>
                    <p className="mb-3">The Playground supports:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>Unity Catalog AI Tools</strong> G�� governed access to enterprise data.</li>
                      <li><strong>Databricks Foundation Models</strong> G�� like MPT, Llama 2, GPT OSS, etc.</li>
                      <li><strong>Custom Tool Integration</strong> G�� connect APIs or databases to your AI agent.</li>
                      <li><strong>Prompt Evaluation</strong> G�� test, compare, and optimize prompts before production use.</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-gray-800 rounded-lg mt-4">
                    <h5 className="text-xl font-semibold text-white mb-3">Advanced Features</h5>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-600 text-sm">
                        <thead>
                          <tr className="bg-gray-700">
                            <th className="border border-gray-600 px-4 py-2 text-left">Feature</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">=��� Agent Prototyping</td>
                            <td className="border border-gray-600 px-4 py-2">Create and test agents that can use APIs, databases, or documents.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">=��� Function Calling</td>
                            <td className="border border-gray-600 px-4 py-2">Extend the model's capabilities by allowing it to call your defined Python or SQL functions.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">=��+ Prompt Testing</td>
                            <td className="border border-gray-600 px-4 py-2">Evaluate how prompts perform across models.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">=��� Evaluation Tools</td>
                            <td className="border border-gray-600 px-4 py-2">Use built-in metrics to test model quality (accuracy, bias, hallucination rate).</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">=��� Unity Catalog Integration</td>
                            <td className="border border-gray-600 px-4 py-2">Ensure data governance and secure access during AI experiments.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg mt-4">
                    <h5 className="text-xl font-semibold text-white mb-3">Benefits</h5>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>=��� Hands-on AI Development:</strong> Experiment freely without deployment setup.</li>
                      <li><strong>=��� Prompt Optimization:</strong> Refine and evaluate prompts before production.</li>
                      <li><strong>=��� Custom Tool Integration:</strong> Combine AI reasoning with data or APIs.</li>
                      <li><strong>=��� Governance:</strong> Integrated with Unity Catalog for secure and auditable AI testing.</li>
                      <li><strong>=��� Multiple Model Access:</strong> Test open-source and Databricks-hosted LLMs.</li>
                    </ul>
                  </div>
                </div>
                {/* Playground images */}
                <ImageGallery images={getImages('db1_image6', 'db1_image7')} />
              </div>

              {/* Experiments - 2nd subheading */}
              <div id="experiments" className="mb-8">
                <h4 className="text-2xl font-semibold text-white mb-4">Experiments</h4>
                <div className="space-y-4 text-gray-300">
                  <p>
                    In Databricks, Experiments represent the core of model development and tracking. An experiment records each run of your machine learning or AI workflow G�� including:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Model parameters (like learning rate, epochs)</li>
                    <li>Metrics (like accuracy, loss)</li>
                    <li>Code version</li>
                    <li>Data version</li>
                    <li>Model artifacts (like trained models)</li>
                  </ul>
                  <p>
                    Experiments help track, compare, and reproduce model performance over time using MLflow.
                  </p>
                  <p>
                    The Experiments module integrates tightly with MLflow 3, providing:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Unified tracking for ML, DL, and GenAI experiments.</li>
                    <li>Versioning for both data and models.</li>
                    <li>Prompt tracking for LLM fine-tuning and evaluation.</li>
                    <li>Advanced observability G�� including lineage and traceability for GenAI agents.</li>
                  </ul>

                  <div className="p-4 bg-gray-800 rounded-lg mt-4">
                    <h5 className="text-xl font-semibold text-white mb-3">Visible Sections:</h5>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>=��� GenAI apps & agents:</strong> For building and tracking Generative AI apps or AI agents.</li>
                      <li><strong>=��� Regression:</strong> Create regression models automatically using AutoML.</li>
                      <li><strong>=��� Forecasting (Preview):</strong> Build time-series forecasting models.</li>
                      <li><strong>=��� Classification:</strong> Train classification models (binary or multi-class).</li>
                      <li><strong>G��n+� Custom model training:</strong> For custom classical ML or deep learning experiments.</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-gray-800 rounded-lg mt-4">
                    <h5 className="text-xl font-semibold text-white mb-3">Experiment Management Options</h5>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-600 text-sm">
                        <thead>
                          <tr className="bg-gray-700">
                            <th className="border border-gray-600 px-4 py-2 text-left">Option</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Create experiment</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Start a new experiment (AutoML or custom).</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Import experiment</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Import experiments from MLflow or external sources.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Filter & Search</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Find experiments by name, tags, or metadata.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Compare Runs</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Side-by-side comparison of multiple experiment runs.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Register Model</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Promote the best model to the Model Registry.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-800 rounded-lg mt-4">
                    <h5 className="text-xl font-semibold text-white mb-3">Advanced Capabilities (MLflow 3 + Databricks)</h5>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-600 text-sm">
                        <thead>
                          <tr className="bg-gray-700">
                            <th className="border border-gray-600 px-4 py-2 text-left">Capability</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Unified Tracking</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Track ML, DL, and GenAI experiments in one place.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Prompt Tracking</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Version and compare prompts for LLM fine-tuning.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Data & Model Lineage</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Full traceability from raw data G�� features G�� model G�� predictions.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>GenAI Agent Observability</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Track tool usage, function calls, and reasoning traces for AI agents.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>AutoML Integration</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Automatically run hyperparameter tuning and feature engineering.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg mt-4">
                    <h5 className="text-xl font-semibold text-white mb-3">Core Functionalities</h5>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>=��� AutoML Experiments:</strong> Automatically builds and tunes models for regression, classification, or forecasting tasks.</li>
                      <li><strong>=��� Custom Model Training:</strong> Allows full control of model code G�� supports PyTorch, TensorFlow, Scikit-learn, etc.</li>
                      <li><strong>=��� GenAI & LLM Tracking:</strong> Records prompt configurations, LLM outputs, and tool usage for AI agents.</li>
                      <li><strong>=��� Experiment Comparison:</strong> Lets you visually compare multiple runs G�� metrics, parameters, and outputs.</li>
                      <li><strong>=��� Integration with Feature Store & Models:</strong> Once the best model is found, link it to the Model Registry for deployment.</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-gray-800 rounded-lg mt-4">
                    <h5 className="text-xl font-semibold text-white mb-3">Benefits</h5>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-600 text-sm">
                        <thead>
                          <tr className="bg-gray-700">
                            <th className="border border-gray-600 px-4 py-2 text-left">Benefit</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>=��� Reproducibility</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Every run records code, data, and environment versions for full reproducibility.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>=��� Model Optimization</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Compare hundreds of runs to find the best hyperparameters and features.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>=�� Collaboration</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Share experiments with team members and track who made what changes.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>=��� Governance</strong></td>
                            <td className="border border-gray-600 px-4 py-2">All experiments are tracked under Unity Catalog with access controls.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* Experiments images */}
                <ImageGallery images={getImages('db1_image8')} />
              </div>

              {/* Features - 3rd subheading */}
              <div id="features" className="mb-8">
                <h4 className="text-2xl font-semibold text-white mb-4">Features</h4>
                <div className="space-y-4 text-gray-300">
                  <p>
                    In Machine Learning, features are the input variables (columns) used by a model to make predictions. For example:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>In a credit scoring model G�� income, age, loan_amount are features.</li>
                    <li>In a product recommender G�� user_history, click_rate, category_interest are features.</li>
                  </ul>
                  <p>
                    The Features tab in Databricks allows you to manage, share, and reuse these features across models and teams.
                  </p>
                  <p>
                    The Feature Store in Databricks (integrated with Unity Catalog) provides:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Centralized feature management</li>
                    <li>Governed access using Unity Catalog</li>
                    <li>Feature lineage tracking</li>
                    <li>Online/offline store integration for model training and real-time inference</li>
                  </ul>
                  <p>
                    It enables feature discovery, reuse, versioning, and monitoring at enterprise scale.
                  </p>

                  <div className="p-4 bg-gray-800 rounded-lg mt-4">
                    <h5 className="text-xl font-semibold text-white mb-3">Table Columns (Once Features Exist)</h5>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-600 text-sm">
                        <thead>
                          <tr className="bg-gray-700">
                            <th className="border border-gray-600 px-4 py-2 text-left">Column</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Name</strong></td>
                            <td className="border border-gray-600 px-4 py-2">The feature table name.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Catalog</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Unity Catalog where the feature table is stored.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Schema</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Schema within the catalog.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Primary Keys</strong></td>
                            <td className="border border-gray-600 px-4 py-2">The keys used to join features (e.g., user_id, product_id).</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Last Modified</strong></td>
                            <td className="border border-gray-600 px-4 py-2">When the feature table was last updated.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-800 rounded-lg mt-4">
                    <h5 className="text-xl font-semibold text-white mb-3">Permissions & Governance</h5>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-600 text-sm">
                        <thead>
                          <tr className="bg-gray-700">
                            <th className="border border-gray-600 px-4 py-2 text-left">Aspect</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Unity Catalog Integration</strong></td>
                            <td className="border border-gray-600 px-4 py-2">All features are managed under Unity Catalog with fine-grained permissions.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Access Control</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Control who can read, write, or manage feature tables.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Data Lineage</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Track which datasets were used to create features.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Feature Versioning</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Maintain multiple versions of features for backward compatibility.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-800 rounded-lg mt-4">
                    <h5 className="text-xl font-semibold text-white mb-3">Feature Store Components</h5>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-600 text-sm">
                        <thead>
                          <tr className="bg-gray-700">
                            <th className="border border-gray-600 px-4 py-2 text-left">Component</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Purpose</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Offline Store</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Delta tables for batch training and historical feature lookups.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Online Store</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Low-latency database (e.g., DynamoDB, Redis) for real-time inference.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Feature Computation</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Automated pipelines to compute and update features.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Feature Serving API</strong></td>
                            <td className="border border-gray-600 px-4 py-2">REST API to fetch features for model inference.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-800 rounded-lg mt-4">
                    <h5 className="text-xl font-semibold text-white mb-3">Advanced Options (For Professionals)</h5>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-600 text-sm">
                        <thead>
                          <tr className="bg-gray-700">
                            <th className="border border-gray-600 px-4 py-2 text-left">Option</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Create feature table</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Manually create a new feature table from existing Delta tables or data sources.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Search features</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Search across all feature tables by name, tags, or metadata.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Feature monitoring</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Set up alerts for feature drift, data quality issues, or missing values.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Feature lineage</strong></td>
                            <td className="border border-gray-600 px-4 py-2">View the complete data lineage from source G�� feature G�� model.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg mt-4">
                    <h5 className="text-xl font-semibold text-white mb-3">Key Benefits</h5>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>G�+n+� Feature Reusability:</strong> Build once, use everywhere G�� across teams and projects.</li>
                      <li><strong>=��� Consistency:</strong> Same feature logic is applied in training and serving.</li>
                      <li><strong>=��� Discoverability:</strong> Easily search and explore existing features.</li>
                      <li><strong>=��+ Governance:</strong> Controlled via Unity Catalog with fine-grained access control.</li>
                      <li><strong>=��� Lineage & Audit:</strong> Full visibility from raw data G�� feature G�� model G�� prediction.</li>
                    </ul>
                  </div>
                </div>
                {/* Features images */}
                <ImageGallery images={getImages('db1_image9')} />
              </div>

              {/* Models - 4th subheading */}
              <div id="models" className="mb-8">
                <h4 className="text-2xl font-semibold text-white mb-4">Models</h4>
                <div className="space-y-4 text-gray-300">
                  <p>
                    This section is part of Databricks Machine Learning. It helps you register, version, manage, and serve ML models built using MLflow or other frameworks.
                  </p>
                  <p>
                    The Models tab integrates with <strong>Unity Catalog</strong> (or the legacy Workspace Model Registry) to provide centralized model management, versioning, and governance across your organization.
                  </p>
                  <p>
                    Currently, no models are registered yet. But once you create or import models, the table will display:
                  </p>
                  <div className="p-4 bg-gray-800 rounded-lg mt-4">
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-600 text-sm">
                        <thead>
                          <tr className="bg-gray-700">
                            <th className="border border-gray-600 px-4 py-2 text-left">Column</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Name</strong></td>
                            <td className="border border-gray-600 px-4 py-2">The model's registered name.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Catalog</strong></td>
                            <td className="border border-gray-600 px-4 py-2">The Unity Catalog that stores the model (e.g., main, sandbox, etc.).</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Schema</strong></td>
                            <td className="border border-gray-600 px-4 py-2">The schema inside the catalog that holds the model.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Last Modified</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Timestamp of the latest model version update.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Owner</strong></td>
                            <td className="border border-gray-600 px-4 py-2">The Databricks user or service principal who owns the model.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-800 rounded-lg mt-4">
                    <h5 className="text-xl font-semibold text-white mb-3">Once Models Exist G�� More Options Appear</h5>
                    <p className="mb-3">When you have registered models, you get these additional actions:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>1. Model Versioning:</strong> Each model can have multiple versions (v1, v2, GǪ) for tracking updates or retraining cycles.</li>
                      <li><strong>2. Model Staging:</strong> Models can have lifecycle stages: None G�� Just registered, Staging G�� For testing and validation, Production G�� For deployment, Archived G�� Old or deprecated versions</li>
                      <li><strong>3. Model Lineage & Metadata:</strong> Tracks which experiment/run created the model. Shows training dataset lineage (via Unity Catalog). Metadata like tags, parameters, and metrics appear automatically from MLflow.</li>
                      <li><strong>4. Permissions:</strong> You can manage who can read or use the model, transition model stages, delete or update versions</li>
                      <li><strong>5. Serving Integration:</strong> Once a model is registered and approved, you can deploy it to Databricks Model Serving, expose it via REST API endpoint for predictions, integrate with Feature Store for consistent feature usage</li>
                    </ul>
                  </div>
                </div>
                {/* Models images */}
                <ImageGallery images={getImages('db1_image10', 'db1_image11')} />
              </div>

              {/* Serving - 5th subheading */}
              <div id="serving" className="mb-8">
                <h4 className="text-2xl font-semibold text-white mb-4">Serving</h4>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Model Serving in Databricks allows you to:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Deploy ML models (including LLMs) for real-time predictions</li>
                    <li>Expose them via REST APIs</li>
                    <li>Serve open-source or external models (like GPT, Llama)</li>
                    <li>Automatically scale endpoints based on demand</li>
                    <li>Secure access with Unity Catalog and IAM policies</li>
                  </ul>

                  <div className="p-4 bg-gray-800 rounded-lg mt-4">
                    <h5 className="text-xl font-semibold text-white mb-3">Top Models You See Here</h5>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-600 text-sm">
                        <thead>
                          <tr className="bg-gray-700">
                            <th className="border border-gray-600 px-4 py-2 text-left">Model</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Use Case</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>GPT OSS 120B / 20B</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Open-source GPT models (120B or 20B parameters) hosted by Databricks.</td>
                            <td className="border border-gray-600 px-4 py-2">Large-scale language tasks, code generation, chat applications.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>OpenAI GPT-5</strong></td>
                            <td className="border border-gray-600 px-4 py-2">OpenAI's latest GPT model (if available via API integration).</td>
                            <td className="border border-gray-600 px-4 py-2">Advanced conversational AI, text generation, summarization.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Llama 4 Maverick</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Meta's Llama 4 model variant, optimized for enterprise use.</td>
                            <td className="border border-gray-600 px-4 py-2">Enterprise AI applications, RAG systems, document Q&A.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Gemma 3 12B</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Google's Gemma model (12B parameters) for efficient inference.</td>
                            <td className="border border-gray-600 px-4 py-2">Cost-effective language tasks, smaller-scale deployments.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>BGE/GTE Large</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Embedding models for text vectorization (BGE or GTE architecture).</td>
                            <td className="border border-gray-600 px-4 py-2">Semantic search, RAG retrieval, similarity matching.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-800 rounded-lg mt-4">
                    <h5 className="text-xl font-semibold text-white mb-3">Details from the Screenshot</h5>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-600 text-sm">
                        <thead>
                          <tr className="bg-gray-700">
                            <th className="border border-gray-600 px-4 py-2 text-left">Column</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Name</strong></td>
                            <td className="border border-gray-600 px-4 py-2">The name of the deployed serving endpoint.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>State</strong></td>
                            <td className="border border-gray-600 px-4 py-2">The current deployment status (e.g., Ready, Deploying, Failed).</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Served entities</strong></td>
                            <td className="border border-gray-600 px-4 py-2">The specific model or model version being served (e.g., GPT OSS 120B, Llama 4 Maverick).</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Tags</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Metadata tags (e.g., Chat, Embeddings).</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Task</strong></td>
                            <td className="border border-gray-600 px-4 py-2">The model type or function G�� Chat (LLMs), Embeddings (vectorization), etc.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Created by</strong></td>
                            <td className="border border-gray-600 px-4 py-2">User or system who deployed the endpoint.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Last modified</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Timestamp of the latest deployment change.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-800 rounded-lg mt-4">
                    <h5 className="text-xl font-semibold text-white mb-3">Part of Full AI/ML Lifecycle</h5>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-600 text-sm">
                        <thead>
                          <tr className="bg-gray-700">
                            <th className="border border-gray-600 px-4 py-2 text-left">Stage</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Databricks Component</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Purpose</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>1. Experimentation</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Experiments (MLflow)</td>
                            <td className="border border-gray-600 px-4 py-2">Track model training runs, compare metrics, tune hyperparameters.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>2. Feature Engineering</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Feature Store</td>
                            <td className="border border-gray-600 px-4 py-2">Create, version, and reuse features across models.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>3. Model Registration</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Models (Registry)</td>
                            <td className="border border-gray-600 px-4 py-2">Register, version, and stage models (Staging G�� Production).</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>4. Model Deployment</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Serving (This Section)</td>
                            <td className="border border-gray-600 px-4 py-2">Deploy models as REST APIs for real-time inference.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>5. Monitoring</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Model Serving Metrics</td>
                            <td className="border border-gray-600 px-4 py-2">Monitor latency, throughput, errors, and model drift.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg mt-4">
                    <h5 className="text-xl font-semibold text-white mb-3">Actions Available per Model</h5>
                    <p className="mb-2">Each model endpoint (like GPT, Llama, etc.) gives you options such as:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>Use:</strong> Opens an interface to test the model directly within Databricks.</li>
                      <li><strong>Copy:</strong> Copies the REST API URL and authentication token.</li>
                      <li><strong>Configure:</strong> Modify endpoint settings G�� scale, model version, environment variables.</li>
                      <li><strong>Create Serving Endpoint:</strong> Deploy your own trained model or clone an existing one.</li>
                    </ul>
                  </div>
                </div>
                {/* Serving images */}
                <ImageGallery images={getImages('db1_image12', 'db1_image13')} />
              </div>
            </div>

            {/* Notebook-level features - Main Heading */}
            <div id="notebook-level-features" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h3 className="text-3xl font-bold text-white mb-6">Notebook-level features</h3>
              
              <div className="space-y-4 text-gray-300 mb-8">
                <p>
                  A Databricks notebook is an interactive environment for:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Writing and running code (Python, SQL, Scala, R)</li>
                  <li>Visualizing data</li>
                  <li>Managing ML workflows</li>
                  <li>Collaborating and sharing results</li>
                </ul>
                <p>
                  It supports multi-language notebooks meaning you can run Python, SQL, Scala, R, or Markdown in the same file using magic commands (like %python, %sql, %scala, %md).
                </p>

                <div className="p-4 bg-gray-800 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Key Notebook UI Features</h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-600 text-sm">
                      <thead>
                        <tr className="bg-gray-700">
                          <th className="border border-gray-600 px-4 py-2 text-left">Feature</th>
                          <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2">=��+ Notebook Title ("my notebook")</td>
                          <td className="border border-gray-600 px-4 py-2">Editable notebook name. You can rename it anytime.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2">=��� Toolbar</td>
                          <td className="border border-gray-600 px-4 py-2">Provides actions like Run, Connect, Schedule, Share, File options, etc.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2">G��n+� Run / Run all / Schedule</td>
                          <td className="border border-gray-600 px-4 py-2">Run current cell or all cells; schedule notebooks as automated jobs.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2">=��� Language Selector (Python, SQL, etc.)</td>
                          <td className="border border-gray-600 px-4 py-2">Set default language for the notebook.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2">=��� Connect</td>
                          <td className="border border-gray-600 px-4 py-2">Connects the notebook to a cluster (compute resource). Required before execution.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2">=��� Share</td>
                          <td className="border border-gray-600 px-4 py-2">Share the notebook with team members or grant access via permissions.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2">G��n+� Settings / Comments / Command Palette</td>
                          <td className="border border-gray-600 px-4 py-2">Quick access to environment settings and collaborative comments.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Code Cell Features</h5>
                  <p className="mb-3">Each code cell has:</p>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-600 text-sm">
                      <thead>
                        <tr className="bg-gray-700">
                          <th className="border border-gray-600 px-4 py-2 text-left">Option</th>
                          <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2">G��n+� Run Cell</td>
                          <td className="border border-gray-600 px-4 py-2">Executes the code within the selected cell.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2">G�+ Drag Handle</td>
                          <td className="border border-gray-600 px-4 py-2">Allows you to reorder or move cells.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2">=��� Language Indicator (Python)</td>
                          <td className="border border-gray-600 px-4 py-2">Shows the language mode of the current cell.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2">=��� Add Cell Above/Below</td>
                          <td className="border border-gray-600 px-4 py-2">Insert new code or markdown cells.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2">=��� Clear Output</td>
                          <td className="border border-gray-600 px-4 py-2">Removes output from the cell without deleting code.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2">=���n+� Delete Cell</td>
                          <td className="border border-gray-600 px-4 py-2">Deletes the current cell.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* File-level Features - 1st subheading */}
              <div id="file-level-features" className="mb-8">
                <h4 className="text-2xl font-semibold text-white mb-4">File-level Features</h4>
                <div className="space-y-4 text-gray-300">
                  <p>
                    File menu contains all options related to creating, managing, importing, exporting, and sharing notebooks in Databricks.
                  </p>
                  
                  <div className="p-4 bg-gray-800 rounded-lg mt-4">
                    <h5 className="text-xl font-semibold text-white mb-3">=��� Databricks Notebook G�� File Menu</h5>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-600 text-sm">
                        <thead>
                          <tr className="bg-gray-700">
                            <th className="border border-gray-600 px-4 py-2 text-left">Menu Option</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Description & Usage</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">=��� New notebook</td>
                            <td className="border border-gray-600 px-4 py-2">Opens a brand-new notebook. You can choose the language (Python, SQL, Scala, or R) and cluster later.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">=��� ImportGǪ</td>
                            <td className="border border-gray-600 px-4 py-2">Allows you to import existing notebooks (from .dbc, .html, .ipynb, or Git repositories).</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">=��� New notebook dashboard</td>
                            <td className="border border-gray-600 px-4 py-2">Creates a dashboard view G�� ideal for visualizations and results presentation, often used in reporting.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">=��� ShareGǪ</td>
                            <td className="border border-gray-600 px-4 py-2">Opens the sharing dialog where you can grant permissions to other users or groups (View, Run, Edit, Manage).</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">GŦ ScheduleGǪ</td>
                            <td className="border border-gray-600 px-4 py-2">Lets you schedule notebook runs at set intervals (daily, hourly, etc.) G�� useful for data pipelines or automation.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">G��n+� Change default cell languageGǪ</td>
                            <td className="border border-gray-600 px-4 py-2">Sets the default language (Python, SQL, Scala, or R) for new cells in this notebook.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">=��� Commit to GitGǪ</td>
                            <td className="border border-gray-600 px-4 py-2">Integrates with Git (GitHub, GitLab, Azure Repos) G�� allows version control, branching, and pushing changes.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">=��� CloneGǪ</td>
                            <td className="border border-gray-600 px-4 py-2">Makes an identical copy of the current notebook within the workspace.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">G��n+� RenameGǪ</td>
                            <td className="border border-gray-600 px-4 py-2">Rename the notebook file name.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">=��� ExportGǪ</td>
                            <td className="border border-gray-600 px-4 py-2">Export notebook in multiple formats: HTML (read-only view), SOURCE (plain text), DBC archive, IPYNB (Jupyter notebook format).</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">=��� MoveGǪ</td>
                            <td className="border border-gray-600 px-4 py-2">Move notebook to a different folder or workspace location.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">=���n+� Move to trash</td>
                            <td className="border border-gray-600 px-4 py-2">Deletes (moves) notebook to Trash; can be restored later if needed.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">G��n+� Upload files to volumeGǪ</td>
                            <td className="border border-gray-600 px-4 py-2">Uploads files (datasets, scripts, etc.) directly into a mounted volume or workspace for use in your notebook.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">=��� Create or modify tableGǪ</td>
                            <td className="border border-gray-600 px-4 py-2">Opens Databricks Data UI to create or edit tables (either Delta or other supported file formats).</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">=��� Add data GǦ</td>
                            <td className="border border-gray-600 px-4 py-2">Opens data ingestion options to connect to data sources (Azure Blob, ADLS, Delta tables, CSVs, etc.).</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* File-level Features images */}
                <ImageGallery images={getImages('db1_image14')} />
              </div>

              {/* Edit level features - 2nd subheading */}
              <div id="edit-level-features" className="mb-8">
                <h4 className="text-2xl font-semibold text-white mb-4">Edit level features</h4>
                <div className="space-y-4 text-gray-300">
                  <p>
                    The Edit menu in Databricks notebooks helps you manage cells, format code, and control execution flow. It is essential for reorganizing notebooks, applying consistent formatting, and speeding up common editing actions.
                  </p>

                  <div className="p-4 bg-gray-800 rounded-lg mt-4">
                    <h5 className="text-xl font-semibold text-white mb-3">Databricks Notebook G�� Edit Menu</h5>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-600 text-sm">
                        <thead>
                          <tr className="bg-gray-700">
                            <th className="border border-gray-600 px-4 py-2 text-left">Menu Option</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Shortcut (Windows / Linux)</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">Undo</td>
                            <td className="border border-gray-600 px-4 py-2">Ctrl + Z</td>
                            <td className="border border-gray-600 px-4 py-2">Reverts the most recent edit or cell deletion.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">Redo</td>
                            <td className="border border-gray-600 px-4 py-2">Ctrl + Shift + Z</td>
                            <td className="border border-gray-600 px-4 py-2">Re-applies an action that was undone.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">Cut / Copy / Paste cell(s)</td>
                            <td className="border border-gray-600 px-4 py-2">Ctrl + X / Ctrl + C / Ctrl + V</td>
                            <td className="border border-gray-600 px-4 py-2">Moves or duplicates cells to reorganize notebooks quickly.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">Delete cell(s)</td>
                            <td className="border border-gray-600 px-4 py-2">D, D</td>
                            <td className="border border-gray-600 px-4 py-2">Removes the selected cell(s). Press the shortcut twice rapidly.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">Skip / Unskip cell(s)</td>
                            <td className="border border-gray-600 px-4 py-2">Ctrl + /</td>
                            <td className="border border-gray-600 px-4 py-2">Temporarily excludes a cell from GǣRun AllGǥ execution.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">Insert cell above / below</td>
                            <td className="border border-gray-600 px-4 py-2">A / B</td>
                            <td className="border border-gray-600 px-4 py-2">Adds a new blank cell above or below the current cell.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">Move cell up / down</td>
                            <td className="border border-gray-600 px-4 py-2">Ctrl + Alt + G�� / G��</td>
                            <td className="border border-gray-600 px-4 py-2">Shifts the selected cell to reorder notebook content.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">Format cell(s)</td>
                            <td className="border border-gray-600 px-4 py-2">Ctrl + Shift + F</td>
                            <td className="border border-gray-600 px-4 py-2">Auto-formats code for consistent indentation and spacing.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2">Find / Replace</td>
                            <td className="border border-gray-600 px-4 py-2">Ctrl + F / Ctrl + H</td>
                            <td className="border border-gray-600 px-4 py-2">Searches for text or replaces it globally within the notebook.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* Edit level features images */}
                <ImageGallery images={getImages('db1_image15')} />
              </div>

              {/* View level features - 3rd subheading */}
              <div id="view-level-features" className="mb-8">
                <h4 className="text-2xl font-semibold text-white mb-4">View level features</h4>
                <div className="space-y-4 text-gray-300">
                  <p>
                    The View menu lets you customize how notebooks look and behave. It controls interface layouts, side panels, cell appearance, themes, and access to cluster/developer tooling so you can focus on exactly what matters.
                  </p>

                  <div className="p-4 bg-gray-800 rounded-lg mt-4">
                    <h5 className="text-xl font-semibold text-white mb-3">Key View Options</h5>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-600 text-sm">
                        <thead>
                          <tr className="bg-gray-700">
                            <th className="border border-gray-600 px-4 py-2 text-left">Category</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">What it controls</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">When to use</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Views</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Toggle Command/Edit mode, Presentation view, Code-only or Results-only display, and Line numbers.</td>
                            <td className="border border-gray-600 px-4 py-2">Ideal for demos, teaching sessions, or focusing on code/results independently.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Notebook Layout</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Default, Compact, or Wide layouts plus show/hide cell toolbars and execution time.</td>
                            <td className="border border-gray-600 px-4 py-2">Optimize the workspace for dense code, wide tables, or additional metadata.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Cell Layout</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Collapse/expand inputs or outputs and enable output scrolling.</td>
                            <td className="border border-gray-600 px-4 py-2">Keep long outputs tidy or focus reviewers on conclusions.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Workspace & Editor Themes</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Switch between Light, Dark, System, Monokai, Solarized, etc.</td>
                            <td className="border border-gray-600 px-4 py-2">Reduce eye strain or match personal/editor preferences.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Side Panel</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Show/Hide workspace browser, pin/unpin, resize.</td>
                            <td className="border border-gray-600 px-4 py-2">Quickly access data, repos, clusters, or comments while editing.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Cluster Tools</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Open cluster logs, details, driver/worker metrics.</td>
                            <td className="border border-gray-600 px-4 py-2">Debug slow jobs or inspect compute usage without leaving the notebook.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Developer Settings</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Enable developer mode, debug console, query snippets.</td>
                            <td className="border border-gray-600 px-4 py-2">Experiment with advanced UI tooling or reuse SQL/Python snippets.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Run-level features - 4th subheading */}
              <div id="run-level-features" className="mb-8">
                <h4 className="text-2xl font-semibold text-white mb-4">Run-level features</h4>
                <div className="space-y-4 text-gray-300">
                  <p>
                    The Run menu in Databricks allows you to execute, debug, clear outputs, and control compute sessions in your notebook. It's primarily used for running code cells and managing the execution environment.
                  </p>

                  <div className="p-4 bg-gray-800 rounded-lg mt-4">
                    <h5 className="text-xl font-semibold text-white mb-3">Run Menu Options</h5>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-600 text-sm">
                        <thead>
                          <tr className="bg-gray-700">
                            <th className="border border-gray-600 px-4 py-2 text-left">Menu Option</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Purpose</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Key Use Case</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Run and Debug</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Execute selected/all cells</td>
                            <td className="border border-gray-600 px-4 py-2">Run or debug code interactively</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Clear</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Remove outputs or execution states</td>
                            <td className="border border-gray-600 px-4 py-2">Clean notebook before rerun</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Go to Last Run Cell</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Jump to last executed cell</td>
                            <td className="border border-gray-600 px-4 py-2">Resume work or debug flow</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Interrupt Execution (I, I)</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Stop current execution</td>
                            <td className="border border-gray-600 px-4 py-2">Abort long or stuck runs</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Detach from Compute Resource</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Disconnect cluster</td>
                            <td className="border border-gray-600 px-4 py-2">Switch or stop compute</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>New Session in Compute Resource</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Restart environment</td>
                            <td className="border border-gray-600 px-4 py-2">Start fresh session for clean execution</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg mt-4">
                    <h5 className="text-xl font-semibold text-white mb-3">Run and Debug Options</h5>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>Run Cell / Run All Cells:</strong> Executes the selected or all notebook cells sequentially.</li>
                      <li><strong>Run Cell and Move to Next:</strong> Runs the current cell, then automatically jumps to the next one.</li>
                      <li><strong>Run Above / Run Below:</strong> Executes all cells either above or below the currently selected cell.</li>
                      <li><strong>Debug Cell (if enabled):</strong> Allows step-by-step execution for debugging purposes.</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-gray-800 rounded-lg mt-4">
                    <h5 className="text-xl font-semibold text-white mb-3">Clear Options</h5>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>Clear Output of Current Cell:</strong> Removes the result/output displayed for the current cell.</li>
                      <li><strong>Clear Output of All Cells:</strong> Clears all results throughout the notebook (code remains intact).</li>
                      <li><strong>Clear State:</strong> Resets notebook variables or execution state (optional in some setups).</li>
                    </ul>
                    <p className="mt-2 text-gray-400">=��� Useful before re-running code to avoid confusion from old outputs.</p>
                  </div>
                </div>
              </div>

              {/* Help-level features - 5th subheading */}
              <div id="help-level-features" className="mb-8">
                <h4 className="text-2xl font-semibold text-white mb-4">Help-level features</h4>
                <div className="space-y-4 text-gray-300">
                  <div className="p-4 bg-gray-800 rounded-lg mt-4">
                    <h5 className="text-xl font-semibold text-white mb-3">Help Menu Options</h5>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-600 text-sm">
                        <thead>
                          <tr className="bg-gray-700">
                            <th className="border border-gray-600 px-4 py-2 text-left">Option</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Purpose</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Shortcut</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Search actions</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Opens a search bar to quickly find and execute commands or actions within the notebook.</td>
                            <td className="border border-gray-600 px-4 py-2">Ctrl + Shift + P</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Keyboard shortcuts</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Displays a list of all available keyboard shortcuts for the notebook.</td>
                            <td className="border border-gray-600 px-4 py-2">H (when "Help" is active)</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Provide feedback</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Opens a prompt where users can provide feedback about their experience with Databricks.</td>
                            <td className="border border-gray-600 px-4 py-2">G��</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Ask the Databricks community</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Opens a link to the Databricks community forum or help center where users can ask questions or browse discussions.</td>
                            <td className="border border-gray-600 px-4 py-2">G��</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Databricks support</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Provides a link to official Databricks support resources, including contact information or technical assistance options.</td>
                            <td className="border border-gray-600 px-4 py-2">G��</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg mt-4">
                    <h5 className="text-xl font-semibold text-white mb-3">Use Cases</h5>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>Search actions:</strong> Rapidly search through available actions or commands without navigating through menus.</li>
                      <li><strong>Keyboard shortcuts:</strong> Quickly learn and use shortcuts, speeding up the workflow. Shortcuts might include things like running cells or navigating between them.</li>
                      <li><strong>Provide feedback:</strong> Share thoughts or report issues encountered while using Databricks.</li>
                      <li><strong>Ask the Databricks community:</strong> Connect to the community for support, troubleshooting, or knowledge sharing.</li>
                      <li><strong>Databricks support:</strong> Get direct, official support for Databricks environment or facing issues that community help may not address.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Language-level features - 6th subheading */}
              <div id="language-level-features" className="mb-8">
                <h4 className="text-2xl font-semibold text-white mb-4">Language-level features</h4>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Sets the default programming language for the current notebook. All new cells you create will use the selected language automatically, though you can still override it in individual cells.
                  </p>

                  <div className="p-4 bg-gray-800 rounded-lg mt-4">
                    <h5 className="text-xl font-semibold text-white mb-3">Available Language Options</h5>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-600 text-sm">
                        <thead>
                          <tr className="bg-gray-700">
                            <th className="border border-gray-600 px-4 py-2 text-left">Language</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Use Case</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Python</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Default and most commonly used option. Supports libraries like PySpark, pandas, NumPy, matplotlib, etc.</td>
                            <td className="border border-gray-600 px-4 py-2">Data processing, machine learning, and automation tasks.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>SQL</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Allows you to write SQL queries directly within the notebook. Often used for querying data from Delta tables or databases.</td>
                            <td className="border border-gray-600 px-4 py-2">Querying data from Delta tables or databases. Integrates well with Databricks' data management and visualization tools.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Scala</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Used for working directly with Apache Spark's core language. Offers performance advantages and full access to Spark APIs.</td>
                            <td className="border border-gray-600 px-4 py-2">Large-scale data transformations. Often preferred by data engineers.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>R</strong></td>
                            <td className="border border-gray-600 px-4 py-2">For data analysis and statistical modeling. Ideal for data scientists working in R environments. Supports packages like ggplot2 and dplyr.</td>
                            <td className="border border-gray-600 px-4 py-2">Data analysis and statistical modeling.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg mt-4">
                    <h5 className="text-xl font-semibold text-white mb-3">=��� Usage Tip</h5>
                    <p>
                      You can mix languages in a single notebook by prefixing a cell with magic commands:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                      <li><code className="bg-gray-700 px-2 py-1 rounded">%python</code> - Run Python code</li>
                      <li><code className="bg-gray-700 px-2 py-1 rounded">%sql</code> - Run SQL queries</li>
                      <li><code className="bg-gray-700 px-2 py-1 rounded">%scala</code> - Run Scala code</li>
                      <li><code className="bg-gray-700 px-2 py-1 rounded">%r</code> - Run R code</li>
                      <li><code className="bg-gray-700 px-2 py-1 rounded">%md</code> - Markdown documentation</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Others features - 7th subheading */}
              <div id="others-features" className="mb-8">
                <h4 className="text-2xl font-semibold text-white mb-4">Others features</h4>
                <div className="space-y-4 text-gray-300">
                  <div className="p-4 bg-gray-800 rounded-lg mt-4">
                    <h5 className="text-xl font-semibold text-white mb-3">Additional Notebook Features</h5>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-600 text-sm">
                        <thead>
                          <tr className="bg-gray-700">
                            <th className="border border-gray-600 px-4 py-2 text-left">Feature</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Purpose</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Use</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Grid/Outline View Icon</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Opens the notebook's table of contents or cell outline view.</td>
                            <td className="border border-gray-600 px-4 py-2">Lets you navigate quickly between notebook cells or sections, especially helpful in long notebooks.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Run all</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Executes all code cells in the notebook sequentially from top to bottom.</td>
                            <td className="border border-gray-600 px-4 py-2">Used when you want to rerun the entire notebook (e.g., after making changes to inputs or variables).</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Connect</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Manages your cluster connection.</td>
                            <td className="border border-gray-600 px-4 py-2">Shows which cluster the notebook is currently attached to. Lets you connect, disconnect, or switch clusters. The blue dot next to it means it's currently connected.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Schedule</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Used to automate notebook runs.</td>
                            <td className="border border-gray-600 px-4 py-2">You can set up recurring runs (daily, weekly, etc.). Often used for production tasks like data refreshes or batch jobs.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Share</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Manages collaboration and access permissions.</td>
                            <td className="border border-gray-600 px-4 py-2">Lets you share the notebook with teammates. You can give view, edit, or run permissions.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* Others features images */}
                <ImageGallery images={getImages('db1_image15', 'db1_image16')} />
              </div>
            </div>
          </div>
        </section>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-700">
          <button
            onClick={goToPreviousSection}
            disabled={!hasPrevious}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              hasPrevious
                ? 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 hover:border-gray-500'
                : 'bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Previous</span>
            {hasPrevious && (
              <span className="text-sm text-gray-400">
                {PAGE_HEADINGS[currentIndex - 1]?.title}
              </span>
            )}
          </button>

          <div className="text-sm text-gray-400">
            {currentIndex + 1} of {PAGE_HEADINGS.length}
          </div>

          <button
            onClick={goToNextSection}
            disabled={!hasNext}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              hasNext
                ? 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 hover:border-gray-500'
                : 'bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed'
            }`}
          >
            <span>Next</span>
            {hasNext && (
              <span className="text-sm text-gray-400">
                {PAGE_HEADINGS[currentIndex + 1]?.title}
              </span>
            )}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </TechLayout>
  );
}

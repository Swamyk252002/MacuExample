package Practice;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class Read_fiile {

	public static void main(String[] args) throws IOException {
         File file=new File("D:\\macu\\MACU_POC\\resources\\config\\test_execution\\test.xlsx");
         FileInputStream fis= new FileInputStream(file);
         XSSFWorkbook wb=new XSSFWorkbook(fis);
         XSSFSheet sheet=wb.getSheetAt(0);
         XSSFCell cell;
         for(int i=1;i<sheet.getLastRowNum();i++) {
        	 cell=sheet.getRow(i).getCell(0);
        	 System.out.println(cell);
        	 
        	 cell=sheet.getRow(i).getCell(1);
        	 System.out.println(cell);
        	 cell=sheet.getRow(i).createCell(2);
        	 cell.setCellValue("passed");
        	 sheet.autoSizeColumn(i);
         }
         FileOutputStream fo=new FileOutputStream(file);
        
         wb.write(fo); //save changes
         wb.close();
         fo.close();
         fis.close();
	}

}

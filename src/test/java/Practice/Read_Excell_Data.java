package Practice;

import java.awt.datatransfer.SystemFlavorMap;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class Read_Excell_Data {

	public static void main(String[] args) throws IOException {
		File file= new File("D:\\macu\\MACU_POC\\resources\\config\\test_execution\\test.xlsx");
		FileInputStream fis=new FileInputStream(file);
		XSSFWorkbook wb=new XSSFWorkbook(fis);
		XSSFSheet sheet=wb.getSheetAt(0);
		XSSFCell cell;
		SimpleDateFormat sdf=new SimpleDateFormat("dd-MMM-yyyy-hh-mm-ss");
		                                           //dd-mmm-yyyy-hh-mm-ss
		Date d=new Date();
		String dates=sdf.format(d);
		for(int i=1;i<sheet.getLastRowNum();i++) {
			cell=sheet.getRow(i).getCell(0);
			System.out.println(cell.getStringCellValue());
			cell=sheet.getRow(i).getCell(1);
			String cellV=String.valueOf(cell);
			System.out.println(cellV);
			
			cell=sheet.getRow(0).createCell(2);
			cell.setCellValue(dates);
			cell=sheet.getRow(i).createCell(2);
			cell.setCellValue("Passed");
			
		}
		sheet.autoSizeColumn(3);
		FileOutputStream fos=new FileOutputStream(file);
		wb.write(fos);
		wb.close();
		fos.close();
		fis.close();

	}

}

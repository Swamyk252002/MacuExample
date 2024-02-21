package Practice;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class Read_Excel_Data {

	public static void main(String[] args) throws InvalidFormatException, IOException {
		
		File file=new File("D:\\macu\\MACU_POC\\resources\\config\\test_execution\\test.xlsx");
		FileInputStream fis=new FileInputStream(file);
		XSSFWorkbook wb=new XSSFWorkbook(fis);
		XSSFSheet sheet=wb.getSheetAt(0);
		XSSFCell cell;
		SimpleDateFormat sf=new SimpleDateFormat("dd-MMM-yyyy-hh-mm-ss");
		Date d=new Date();
		String dt=sf.format(d);
		
		for(int i=1;i<sheet.getLastRowNum();i++) {
			
			cell=sheet.getRow(i).getCell(0);
			System.out.println(cell.getStringCellValue());
			
			cell =sheet.getRow(i).getCell(1);
			String cellvalue=String.valueOf(cell);
			System.out.println(cellvalue);
			
			
			cell=sheet.getRow(i).createCell(2);
			cell.setCellValue("Passed- Working");
			cell=sheet.getRow(0).createCell(2);
			cell.setCellValue(dt);
			
		}
		FileOutputStream fos=new FileOutputStream(file);
		wb.write(fos);
		wb.close();
		fos.close();
		fis.close();
		

	}

}

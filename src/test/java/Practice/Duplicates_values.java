package Practice;

public class Duplicates_values {

	public static void main(String[] args) {
		String s="public static void main(String[] args) {";
		String s1=s.replace(" ", "");
		
		while(s1.length()>0) {
			char c=s1.charAt(0);
			
			System.out.println("dup values:"+c+" "+ countchar(s1,c));
			s1=s1.replace(""+c, "");
			
		}

	}
	private static int countchar(String s1,char c) {
		int count = 0;
		
		while(s1.indexOf(c)>-1) {
			
			count++;
			s1=s1.substring(s1.indexOf(c)+1);
			
			
		}
		
		return count;
		
	}

}
